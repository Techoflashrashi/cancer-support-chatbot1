/*
 * Local retrieval.
 *
 * Every topic, and every short FAQ inside a topic, becomes a "document".
 * A question is scored against each document using:
 *
 *   1. Weighted keyword overlap. Each field has a weight (keywords 2.5,
 *      title 1.5, curated question variants 1.0, summary 0.5). Each matching
 *      token contributes weight x IDF, so rare, specific words such as
 *      "biopsy" count for more than common ones such as "treatment".
 *   2. Question-variant similarity. Cosine similarity between the question's
 *      tokens and each curated way of asking the question, scaled by 4.
 *   3. Phrase bonus for multi-word keywords found intact ("hair loss").
 *   4. Fuzzy matching for misspellings not already handled by the spelling
 *      table: unknown words within a small edit distance of a known word
 *      match it at reduced weight.
 *   5. Conversation context: short follow-ups ("does it hurt?") borrow the
 *      previous topic's terms at half weight, and the previous topic and
 *      its FAQs get a small boost.
 */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});
  var T = CSC.text;

  var W = { keyword: 2.5, title: 1.5, pattern: 1.0, summary: 0.5, parent: 0.8 };

  var index = null;

  function addTokens(map, tokens, w) {
    tokens.forEach(function (tok) { if (!map[tok] || map[tok] < w) map[tok] = w; });
  }

  function phraseList(keywords) {
    var out = [];
    (keywords || []).forEach(function (k) {
      var n = T.tokenize(k);
      if (n.length > 1) out.push(n);
    });
    return out;
  }

  function buildIndex() {
    var docs = [];
    CSC.topics.forEach(function (topic) {
      var w = {};
      addTokens(w, T.tokenize(topic.summary), W.summary);
      (topic.patterns || []).forEach(function (p) { addTokens(w, T.tokenize(p), W.pattern); });
      addTokens(w, T.tokenize(topic.title), W.title);
      (topic.keywords || []).forEach(function (k) { addTokens(w, T.tokenize(k), W.keyword); });
      var parentCore = {};
      addTokens(parentCore, T.tokenize(topic.title), W.parent);
      (topic.keywords || []).forEach(function (k) { addTokens(parentCore, T.tokenize(k), W.parent); });

      docs.push({
        id: topic.id,
        type: "topic",
        topicId: topic.id,
        weights: w,
        patterns: (topic.patterns || []).concat([topic.title]).map(function (p) { return T.tokenize(p); }),
        phrases: phraseList(topic.keywords)
      });

      (topic.faqs || []).forEach(function (faq) {
        var fw = {};
        for (var k in parentCore) fw[k] = parentCore[k];
        (faq.patterns || []).forEach(function (p) { addTokens(fw, T.tokenize(p), W.pattern); });
        addTokens(fw, T.tokenize(faq.q), W.title);
        (faq.keywords || []).forEach(function (kw) { addTokens(fw, T.tokenize(kw), W.keyword); });
        docs.push({
          id: faq.id,
          type: "faq",
          topicId: topic.id,
          faq: faq,
          weights: fw,
          ownWeights: (function () {
            var o = {};
            (faq.keywords || []).forEach(function (kw) { addTokens(o, T.tokenize(kw), 1); });
            (faq.patterns || []).forEach(function (p) { addTokens(o, T.tokenize(p), 1); });
            return o;
          })(),
          patterns: (faq.patterns || []).concat([faq.q]).map(function (p) { return T.tokenize(p); }),
          phrases: phraseList(faq.keywords)
        });
      });
    });

    // Document frequency for IDF, computed over topics only so FAQs do not
    // double-count their parent's vocabulary.
    var df = {}, nTopics = 0, vocab = {};
    docs.forEach(function (d) {
      for (var tok in d.weights) {
        vocab[tok] = (vocab[tok] || 0) + 1;
        if (d.type === "topic") df[tok] = (df[tok] || 0) + 1;
      }
    });
    docs.forEach(function (d) { if (d.type === "topic") nTopics++; });
    var idf = {};
    for (var tok in vocab) idf[tok] = Math.log(1 + nTopics / (df[tok] || 1));

    index = { docs: docs, idf: idf, vocab: Object.keys(vocab), vocabSet: vocab, nTopics: nTopics };
    return index;
  }

  function getIndex() { return index || buildIndex(); }

  /* Map unknown tokens to known ones when the spelling is close. */
  function correctTokens(tokens) {
    var idx = getIndex();
    var out = [];
    tokens.forEach(function (tok) {
      if (idx.vocabSet[tok] || tok.length < 5 || /\d/.test(tok)) { out.push({ tok: tok, fuzzy: false }); return; }
      var max = tok.length >= 8 ? 2 : 1;
      var best = null, bestD = 99;
      for (var i = 0; i < idx.vocab.length; i++) {
        var v = idx.vocab[i];
        if (Math.abs(v.length - tok.length) > max || v.charAt(0) !== tok.charAt(0) && max < 2) continue;
        var d = T.editDistance(tok, v, max);
        if (d < bestD || (d === bestD && best && idx.idf[v] < idx.idf[best])) { bestD = d; best = v; }
      }
      if (best && bestD <= max) out.push({ tok: best, fuzzy: true, original: tok });
      else out.push({ tok: tok, fuzzy: false });
    });
    return out;
  }

  function cosine(qSet, pTokens) {
    if (!pTokens.length) return 0;
    var pSet = {}, inter = 0, pLen = 0;
    pTokens.forEach(function (t) { if (!pSet[t]) { pSet[t] = 1; pLen++; } });
    var qLen = 0;
    for (var t in qSet) { qLen++; if (pSet[t]) inter++; }
    if (!qLen) return 0;
    return inter / Math.sqrt(qLen * pLen);
  }

  /*
   * search(question, context) -> ranked candidates.
   * context: { lastTopicId, isFollowUp }
   */
  function search(question, context) {
    var idx = getIndex();
    context = context || {};
    var raw = T.tokenize(question);
    var corrected = correctTokens(raw);
    var q = {}; // token -> multiplier
    var fuzzyUsed = [];
    corrected.forEach(function (c) {
      var m = c.fuzzy ? 0.7 : 1;
      if (!q[c.tok] || q[c.tok] < m) q[c.tok] = m;
      if (c.fuzzy) fuzzyUsed.push(c.original + " -> " + c.tok);
    });

    var lastTopic = context.lastTopicId ? CSC.getTopic(context.lastTopicId) : null;
    if (context.isFollowUp && lastTopic) {
      var ctxTokens = T.tokenize(lastTopic.title).concat(T.tokenize((lastTopic.keywords || []).slice(0, 4).join(" ")));
      ctxTokens.forEach(function (tok) { if (!q[tok]) q[tok] = 0.5; });
    }

    var qTokens = Object.keys(q);
    var qOwnSet = {}, qStrongOk = {};
    corrected.forEach(function (c) {
      qOwnSet[c.tok] = 1;
      // Short fuzzy corrections ("write" -> "white") are too unreliable to count as a strong match.
      if (!c.fuzzy || c.original.length >= 6) qStrongOk[c.tok] = 1;
    });
    var qString = " " + corrected.map(function (c) { return c.tok; }).join(" ") + " ";

    var results = [];
    idx.docs.forEach(function (d) {
      var s = 0, matched = [], strong = false;
      qTokens.forEach(function (tok) {
        var w = d.weights[tok];
        if (w) {
          s += w * (idx.idf[tok] || 1) * q[tok];
          matched.push(tok);
          // A "strong" match is on a keyword or title word the person actually typed.
          if (w >= W.title && qStrongOk[tok]) strong = true;
        }
      });
      var best = 0;
      d.patterns.forEach(function (p) { var c = cosine(qOwnSet, p); if (c > best) best = c; });
      s += best * 4;
      d.phrases.forEach(function (ph) { if (qString.indexOf(" " + ph.join(" ") + " ") !== -1) s += 1.5; });

      if (d.type === "faq") {
        // An FAQ must match on something of its own, not only its parent's vocabulary.
        var own = 0;
        for (var tk in qOwnSet) if (d.ownWeights[tk]) own++;
        if (!own) s *= 0.35;
        else s += 0.75; // small preference for the more specific answer when it fits
      }

      if (context.isFollowUp && lastTopic) {
        if (d.topicId === lastTopic.id) s += 1.0;
        else if ((lastTopic.related || []).indexOf(d.topicId) !== -1) s += 0.4;
      }
      if (s > 0) results.push({ id: d.id, type: d.type, topicId: d.topicId, score: Math.round(s * 100) / 100, matched: matched, strong: strong, patternSim: Math.round(best * 100) / 100 });
    });

    results.sort(function (a, b) { return b.score - a.score; });
    return { candidates: results.slice(0, 6), tokens: corrected, fuzzy: fuzzyUsed, queryTokenCount: raw.length };
  }

  CSC.retrieval = { search: search, buildIndex: buildIndex, getIndex: getIndex };
})(typeof window !== "undefined" ? window : globalThis);
