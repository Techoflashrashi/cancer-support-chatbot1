/*
 * Text utilities: normalisation, spelling variants, phrase synonyms,
 * tokenising, light stemming and edit distance.
 *
 * Everything here is deterministic and runs locally. No machine learning,
 * language model or embeddings are used anywhere in this project.
 */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});

  /* Contractions are expanded first so "don't" and "dont" behave the same. */
  var CONTRACTIONS = [
    [/\bwon'?t\b/g, "will not"],
    [/\bcan'?t\b/g, "cannot"],
    [/\bshan'?t\b/g, "shall not"],
    [/\b(do|does|did|is|are|was|were|has|have|had|should|would|could|must)n'?t\b/g, "$1 not"],
    [/\bi'?m\b/g, "i am"],
    [/\b(he|she|it|that|what|there)'s\b/g, "$1 is"],
    [/\b(you|we|they)'re\b/g, "$1 are"],
    [/\b(i|you|we|they)'ve\b/g, "$1 have"],
    [/\b(i|you|we|they|he|she)'ll\b/g, "$1 will"],
    [/\b(i|you|we|they|he|she)'d\b/g, "$1 would"],
    [/'s\b/g, ""]
  ];

  /* British and Indian English spellings mapped to one form, plus common misspellings. */
  var SPELLING = {
    tumour: "tumor", tumours: "tumors", leukaemia: "leukemia", leukaemias: "leukemias", leukimia: "leukemia",
    lukemia: "leukemia", leukemea: "leukemia", haemoglobin: "hemoglobin", hemoglobine: "hemoglobin",
    anaemia: "anemia", anaemic: "anemic", anaesthesia: "anesthesia", anaesthetic: "anesthetic",
    paediatric: "pediatric", paediatrician: "pediatrician", behaviour: "behavior", behaviours: "behaviors",
    colour: "color", centre: "center", centres: "centers", organise: "organize", organised: "organized",
    organising: "organizing", counsellor: "counselor", counselling: "counseling", randomised: "randomized",
    diarrhoea: "diarrhea", oesophagus: "esophagus", haemorrhage: "hemorrhage", oncologyst: "oncologist",
    oncolgist: "oncologist", onclogist: "oncologist", chemotheraphy: "chemotherapy", chemotherpy: "chemotherapy",
    chemotherapie: "chemotherapy", kemo: "chemo", keemo: "chemo", chemmo: "chemo", biospy: "biopsy",
    byopsy: "biopsy", biopsey: "biopsy", biopsi: "biopsy", remision: "remission", remmission: "remission",
    relaps: "relapse", radiotheraphy: "radiotherapy", radiatoin: "radiation", nuetropenia: "neutropenia",
    neutropaenia: "neutropenia", platlets: "platelets", platelates: "platelets", plateletes: "platelets",
    feaver: "fever", fevar: "fever", vomitting: "vomiting", vommiting: "vomiting", nausia: "nausea",
    nauseau: "nausea", diagnoised: "diagnosed", diagonsed: "diagnosed", diagnoses: "diagnosis",
    sibblings: "siblings", siblins: "siblings", scann: "scan", mri: "mri", prescripton: "prescription",
    perscription: "prescription", medecine: "medicine", medicene: "medicine", docter: "doctor", doctr: "doctor",
    tommorow: "tomorrow", tomorow: "tomorrow", tommorrow: "tomorrow", wat: "what", wht: "what", u: "you",
    pls: "please", plz: "please", abt: "about", coz: "because", becoz: "because", ur: "your"
  };

  /*
   * Phrase synonyms: everyday words mapped to the terms used in the
   * knowledge base. Applied to whole phrases before tokenising.
   * Order matters: longer phrases first.
   */
  var PHRASES = [
    ["blood cancer", "leukemia"],
    ["hair fall", "hair loss"], ["hairfall", "hair loss"], ["losing hair", "hair loss"],
    ["lose hair", "hair loss"], ["lose their hair", "hair loss"], ["lose his hair", "hair loss"],
    ["lose her hair", "hair loss"], ["lose my hair", "hair loss"], ["go bald", "hair loss bald"],
    ["going bald", "hair loss bald"], ["hair falling", "hair loss"], ["hair fall out", "hair loss"],
    ["throwing up", "vomiting"], ["throw up", "vomiting"], ["throws up", "vomiting"], ["puking", "vomiting"],
    ["feeling sick", "nausea"], ["feels sick", "nausea"], ["feel sick", "nausea"], ["feeling nauseous", "nausea"],
    ["loose motions", "diarrhea"], ["loose motion", "diarrhea"],
    ["spinal tap", "lumbar puncture"], ["back injection", "lumbar puncture"],
    ["radiotherapy", "radiation therapy"], ["radio therapy", "radiation therapy"],
    ["bone marrow transplant", "stem cell transplant"],
    ["tissue sample", "biopsy sample"], ["piece of tissue", "biopsy tissue"],
    ["cat scan", "ct scan"], ["sonography", "ultrasound"], ["usg", "ultrasound"],
    ["histopathology report", "pathology report"], ["hpe report", "pathology report"], ["biopsy report", "pathology report biopsy"],
    ["white cells", "wbc"], ["white blood cells", "wbc"], ["white blood cell", "wbc"], ["red cells", "red blood cells hemoglobin"],
    ["blood counts", "blood count cbc"], ["complete blood count", "cbc blood count"],
    ["low immunity", "neutropenia infection"], ["weak immunity", "neutropenia infection"], ["immunity is low", "neutropenia infection"],
    ["high temperature", "fever"], ["high temp", "fever"], ["bukhar", "fever"],
    ["cancer doctor", "oncologist"], ["children cancer doctor", "pediatric oncologist"],
    ["brothers and sisters", "siblings"], ["brother and sister", "siblings"], ["other kids", "other children siblings"],
    ["little brother", "sibling brother"], ["little sister", "sibling sister"], ["older brother", "sibling brother"], ["older sister", "sibling sister"],
    ["mouth ulcers", "mouth sores"], ["mouth ulcer", "mouth sores"],
    ["come back", "relapse"], ["came back", "relapse"], ["coming back", "relapse"],
    ["no appetite", "appetite"], ["not eating", "appetite eating"], ["won't eat", "appetite eating"], ["will not eat", "appetite eating"],
    ["chemo port", "port"], ["chemoport", "port"],
    ["side-effects", "side effects"], ["sideeffects", "side effects"],
    ["follow-up", "follow up"], ["followup", "follow up"], ["check-up", "follow up"], ["checkup", "follow up"], ["check up", "follow up"],
    ["day-care", "day care"], ["daycare", "day care"],
    ["teen ager", "teenager"], ["13 year old", "teenager"], ["14 year old", "teenager"], ["15 year old", "teenager"],
    ["16 year old", "teenager"], ["17 year old", "teenager"],
    ["make sense of", "understand"], ["get my head around", "understand"],
    ["my other child", "sibling other children"], ["our other child", "sibling other children"], ["the other child", "sibling other children"],
    ["tell my child", "talkchild"], ["tell my son", "talkchild"], ["tell my daughter", "talkchild"], ["tell my kids", "talkchild"],
    ["tell our child", "talkchild"], ["talk to my child", "talkchild"], ["talk to my son", "talkchild"], ["talk to my daughter", "talkchild"],
    ["explain cancer to", "talkchild"], ["explain to my child", "talkchild"], ["explain to my son", "talkchild"], ["explain to my daughter", "talkchild"],
    ["tell him he has", "talkchild"], ["tell her she has", "talkchild"]
  ];

  var STOPWORDS = (
    "a an the and or but if then so of to in on at by for with from up down out over under about into onto " +
    "is are was were be been being am do does did done doing have has had having can could would should shall " +
    "will may might must i me my mine we us our ours you your yours he him his she her hers they them their theirs " +
    "it its this that these those there here what which who whom whose when where how please kindly " +
    "know want need like get got also just really very much many some any all each more most other such only own " +
    "same than too s t now going go yes no not okay ok hi hey hello thanks thank sir madam maam ji dear " +
    "child children kid kids son daughter baby boy girl toddler little"
  ).split(" ");
  var STOP = {};
  STOPWORDS.forEach(function (w) { STOP[w] = true; });
  /* Words that look like filler but carry meaning in this domain ("other children" = siblings). */
  delete STOP.other;
  // Note: "all" stays a stopword for retrieval because it is usually filler.
  // The glossary lookup handles "what is ALL" (the leukemia) separately.

  function basicNormalize(text) {
    var t = String(text == null ? "" : text).toLowerCase();
    t = t.replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"');
    t = t.replace(/[\u2013\u2014]/g, " ");
    CONTRACTIONS.forEach(function (pair) { t = t.replace(pair[0], pair[1]); });
    t = t.replace(/[^a-z0-9\s\-'.%°]/g, " ");
    t = t.replace(/(\D)\.(\D)/g, "$1 $2").replace(/\.(\s|$)/g, " ");
    t = t.replace(/'/g, "");
    t = t.replace(/\s+/g, " ").trim();
    return t;
  }

  function fixSpelling(t) {
    return t.split(" ").map(function (w) { return SPELLING[w] || w; }).join(" ");
  }

  function applyPhrases(t) {
    var padded = " " + t + " ";
    for (var i = 0; i < PHRASES.length; i++) {
      var from = " " + PHRASES[i][0] + " ";
      if (padded.indexOf(from) !== -1) {
        padded = padded.split(from).join(" " + PHRASES[i][1] + " ");
      }
    }
    return padded.trim();
  }

  /* Full normalisation used for both the knowledge base and user questions. */
  function normalize(text) {
    var t = basicNormalize(text);
    t = fixSpelling(t);
    t = t.replace(/-/g, " ");
    t = applyPhrases(t);
    return t.replace(/\s+/g, " ").trim();
  }

  /* A small, predictable suffix stripper. Good enough for matching, easy to reason about. */
  function stem(w) {
    if (w.length <= 3) return w;
    if (/ies$/.test(w) && w.length > 4) return w.slice(0, -3) + "y";
    if (/sses$/.test(w)) return w.slice(0, -2);
    if (/ing$/.test(w) && w.length > 5) {
      var b = w.slice(0, -3);
      if (/(.)\1$/.test(b) && !/(ll|ss)$/.test(b)) b = b.slice(0, -1);
      return b;
    }
    if (/ed$/.test(w) && w.length > 4 && !/eed$/.test(w)) {
      var c = w.slice(0, -2);
      if (/(.)\1$/.test(c) && !/(ll|ss)$/.test(c)) c = c.slice(0, -1);
      return c;
    }
    if (/s$/.test(w) && !/(ss|us|is|os)$/.test(w) && w.length > 3) return w.slice(0, -1);
    return w;
  }

  function tokenize(text, keepStopwords) {
    var t = normalize(text);
    if (!t) return [];
    var out = [];
    t.split(" ").forEach(function (w) {
      w = w.replace(/^[.\-%°]+|[.\-%°]+$/g, "");
      if (!w) return;
      if (!keepStopwords && STOP[w]) return;
      out.push(stem(w));
    });
    return out;
  }

  /* Optimal string alignment distance (Damerau-Levenshtein with adjacent swaps). */
  function editDistance(a, b, max) {
    if (a === b) return 0;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > (max == null ? 99 : max)) return 99;
    var d = [];
    for (var i = 0; i <= la; i++) { d[i] = [i]; }
    for (var j = 0; j <= lb; j++) { d[0][j] = j; }
    for (i = 1; i <= la; i++) {
      var rowMin = 99;
      for (j = 1; j <= lb; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        var v = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
          v = Math.min(v, d[i - 2][j - 2] + 1);
        }
        d[i][j] = v;
        if (v < rowMin) rowMin = v;
      }
      if (max != null && rowMin > max) return 99;
    }
    return d[la][lb];
  }

  CSC.text = {
    basicNormalize: basicNormalize,
    normalize: normalize,
    tokenize: tokenize,
    stem: stem,
    editDistance: editDistance,
    isStopword: function (w) { return !!STOP[w]; }
  };
})(typeof window !== "undefined" ? window : globalThis);
