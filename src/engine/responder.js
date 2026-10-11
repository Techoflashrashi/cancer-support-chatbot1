/*
 * Response engine.
 *
 * Order of decisions for every message:
 *   1. Empty or very long input handling
 *   2. Safety classification (crisis, emergency, urgent, personal-advice boundaries)
 *   3. Conversation intents (greeting, thanks, "who are you", "tell me more", open a tool)
 *   4. Definition lookups ("what does X mean") against the glossary
 *   5. Retrieval over topics and FAQs, with confidence checks:
 *        low score          -> honest fallback with related topics
 *        two close matches  -> clarifying question
 *        otherwise          -> answer
 *
 * Every response is a plain data object. The interface decides how to show it.
 */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});
  var T = CSC.text;

  var CONFIG = {
    minScore: 3.2,        // below this, we do not trust the match
    clarifyRatio: 0.9,    // second-best within 90% of the best...
    clarifyCeiling: 9,    // ...and the best is not already a strong match
    maxInputLength: 1000,
    emergencyNumberIndia: "112",
    teleManas: "14416"
  };

  var URGENT_FOOTER = "If your child is very unwell, is struggling to breathe, cannot be woken, or is having a seizure, call emergency services now (112 in India, or your local emergency number) or go to the nearest emergency department.";

  /* ---------------- Glossary helpers ---------------- */

  var glossaryIndex = null;
  function getGlossaryIndex() {
    if (glossaryIndex) return glossaryIndex;
    glossaryIndex = [];
    CSC.glossary.forEach(function (g) {
      var keys = [g.term].concat(g.aliases || []);
      var head = g.term.replace(/\s*\(.*\)\s*$/, "");
      if (head !== g.term) keys.push(head);
      var paren = /\(([^)]+)\)/.exec(g.term);
      if (paren) keys.push(paren[1]);
      keys.forEach(function (k) { glossaryIndex.push({ key: T.normalize(k), entry: g }); });
    });
    return glossaryIndex;
  }

  function lookupGlossary(phrase) {
    var p = T.normalize(phrase).replace(/^(a|an|the)\s+/, "").replace(/\s+(mean|means|meaning|stand for|stands for)$/, "").trim();
    if (!p) return null;
    var idx = getGlossaryIndex();
    for (var i = 0; i < idx.length; i++) if (idx[i].key === p) return idx[i].entry;
    // allow simple plurals and close spellings
    var stemmed = p.replace(/s$/, "");
    for (i = 0; i < idx.length; i++) if (idx[i].key === stemmed || idx[i].key.replace(/s$/, "") === stemmed) return idx[i].entry;
    if (p.length >= 5) {
      var best = null, bestD = 99;
      for (i = 0; i < idx.length; i++) {
        var max = p.length >= 9 ? 2 : 1;
        var d = T.editDistance(p, idx[i].key, max);
        if (d <= max && d < bestD) { bestD = d; best = idx[i].entry; }
      }
      return best;
    }
    return null;
  }

  /* Find glossary terms that appear in an answer, so the UI can offer quick definitions. */
  function termsInText(text, exclude) {
    var found = [], seen = {};
    var lower = " " + text.toLowerCase().replace(/[^a-z0-9\s]/g, " ") + " ";
    CSC.glossary.forEach(function (g) {
      if (found.length >= 6 || seen[g.term]) return;
      var head = g.term.replace(/\s*\(.*\)\s*$/, "").toLowerCase();
      var acronym = (/\(([A-Z]{2,5})\)/.exec(g.term) || [])[1];
      var hit = lower.indexOf(" " + head + " ") !== -1 || lower.indexOf(" " + head + "s ") !== -1;
      if (!hit && acronym) hit = new RegExp("\\b" + acronym + "\\b").test(text);
      if (hit && (!exclude || exclude.indexOf(g.term) === -1)) { seen[g.term] = 1; found.push(g); }
    });
    return found;
  }

  /* ---------------- Small helpers ---------------- */

  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }

  var DISTRESS_OPENERS = [
    "That sounds really hard. Many parents and young people feel this way, and it is okay to take things one step at a time.",
    "I'm sorry you're dealing with this. Feeling frightened or overwhelmed is a very common reaction, and you don't have to understand everything at once.",
    "It makes sense to feel this way. Here is some information that may help, and please lean on the people around you and your child's team."
  ];

  function blocksText(blocks) {
    var out = [];
    (blocks || []).forEach(function (b) {
      if (b.h) out.push(b.h);
      (b.p || []).forEach(function (p) { out.push(p); });
      (b.list || []).forEach(function (l) { out.push(l); });
    });
    return out.join(" ");
  }

  function base(kind) {
    return { kind: kind, title: "", lead: null, opener: null, notices: [], blocks: [], more: [], askTeam: [], terms: [], sources: [], followUps: [], choices: [], topicId: null, docId: null, action: null, debug: {} };
  }

  function urgentBannerText(safety) {
    var labels = (safety.symptoms || []).filter(function (s) { return s.id !== "ask-emergency"; }).map(function (s) { return s.label; });
    var which = labels.length ? "has " + labels.slice(0, 2).join(" or ") : "is unwell";
    if (safety.crisisMention) {
      return "If a child has talked about wanting to die or hurting themselves, take it seriously and contact their treating team or a doctor today. In immediate danger, call 112 (India) or your local emergency number.";
    }
    return "If your child " + which + " right now, contact their treating team without waiting. For emergencies, call 112 (India) or your local emergency number.";
  }

  /* ---------------- Topic and FAQ answers ---------------- */

  function topicResponse(topic, opts) {
    opts = opts || {};
    var r = base("answer");
    r.title = topic.title;
    r.topicId = topic.id;
    r.docId = topic.id;
    r.blocks = [{ p: topic.short.slice() }];
    r.more = (topic.more || []).slice();
    r.expanded = !!opts.expanded;
    r.askTeam = (topic.askTeam || []).slice();
    r.sources = (topic.sources || []).slice();
    var asked = T.normalize(opts.question || "");
    r.followUps = (topic.followUps || []).filter(function (f) { return T.normalize(f) !== asked; }).slice(0, 4);
    r.terms = termsInText(topic.short.join(" ") + " " + blocksText(topic.more), [topic.title]);
    r.category = topic.category;
    if (topic.flags && topic.flags.urgentBanner) {
      r.notices.push({ type: "urgent", text: "If your child has a fever or seems unwell right now, contact their treating team straight away. For emergencies, call 112 (India) or your local emergency number." });
    }
    return r;
  }

  function faqResponse(topic, faq) {
    var r = base("faq");
    r.title = faq.q;
    r.topicId = topic.id;
    r.docId = faq.id;
    r.blocks = [{ p: faq.a.slice() }];
    r.askTeam = (topic.askTeam || []).slice(0, 3);
    r.sources = (topic.sources || []).slice();
    r.parentTitle = topic.title;
    r.followUps = [];
    (topic.faqs || []).forEach(function (f) { if (f.id !== faq.id) r.followUps.push(f.q); });
    r.followUps = r.followUps.concat((topic.followUps || []).slice(0, 2)).slice(0, 4);
    r.terms = termsInText(faq.a.join(" "));
    r.category = topic.category;
    r.choices = [{ label: "Read the full guide: " + topic.title, topicId: topic.id }];
    return r;
  }

  /* ---------------- Safety responses ---------------- */

  function crisisResponse() {
    var r = base("crisis");
    r.title = "You deserve support right now";
    r.blocks = [
      { p: [
        "I'm really sorry things feel this hard. I'm an information tool, so I can't give the support you need right now, but you do not have to face this alone."
      ] },
      { list: [
        "**If you or your child are in immediate danger, call emergency services now** (112 in India, or your local emergency number), or go to the nearest emergency department.",
        "**In India, you can call Tele-MANAS on 14416**, the national mental health helpline, to talk to a trained counselor.",
        "If you are outside India, contact your local emergency number or a local crisis helpline.",
        "If a child or teenager has said they want to die or hurt themselves, take it seriously. Stay with them, keep medicines and sharp objects out of reach, and contact their treating team or a doctor today.",
        "Tell someone you trust what you are feeling: a family member, friend, nurse, doctor or counselor."
      ] }
    ];
    r.followUps = ["How do I look after myself?", "How do I support my child's feelings?"];
    return r;
  }

  function emergencyResponse(safety) {
    var r = base("emergency");
    var labels = safety.symptoms.filter(function (s) { return s.level === "emergency"; }).map(function (s) { return s.label; });
    r.title = "This could be an emergency";
    r.blocks = [
      { p: [
        "**Call emergency services now (112 in India, or your local emergency number), or go to the nearest emergency department.**",
        "Then contact your child's treating team and tell them what has happened.",
        "You mentioned " + (labels[0] || "a serious symptom") + ". I cannot assess your child, and this needs immediate help from medical professionals, not information from an app."
      ] }
    ];
    r.followUps = ["When should I call the care team urgently?"];
    return r;
  }

  function urgentResponse(safety) {
    var r = base("urgent");
    var labels = safety.symptoms.filter(function (s) { return s.id !== "ask-emergency"; }).map(function (s) { return s.label; });
    var what = labels.length ? labels.slice(0, 2).join(" and ") : "a change like this";
    r.title = "Please contact your child's treating team now";
    var paras = [
      "**Call your child's treating team now**, using the urgent number they gave you. If you cannot reach them, go to the nearest emergency department and tell staff your child is having cancer treatment.",
      "I can't assess your child or tell you whether this is serious. During cancer treatment, " + what + " can need urgent medical attention, so it is best to let the team decide.",
      URGENT_FOOTER
    ];
    if (safety.symptoms.some(function (s) { return s.id === "fever"; })) {
      paras.splice(2, 0, "Unless the team has already told you what to give, ask them before giving any fever medicine, because it can hide a fever.");
    }
    r.blocks = [{ p: paras }];
    r.followUps = ["When should I call the care team urgently?", "Why is fever dangerous during chemotherapy?"];
    if (!safety.symptoms.some(function (s) { return s.id === "fever"; })) r.followUps = ["When should I call the care team urgently?", "How can I keep track of everything?"];
    return r;
  }

  var BOUNDARY_CONTENT = {
    diagnose: {
      title: "I can't tell whether this is cancer",
      blocks: [
        { p: [
          "I'm not able to diagnose cancer or say whether symptoms, a scan or a test mean cancer or a relapse. Only doctors who can examine your child and review their tests can do that.",
          "Many symptoms that worry parents have other causes, but symptoms that are new, lasting or getting worse should be checked. **Please speak to your child's doctor or treating team.** If your child is unwell now, contact them or seek urgent care."
        ] }
      ],
      askTeam: ["What could be causing these symptoms?", "What tests do you recommend, and what will they show?", "When will we know more?"],
      followUps: ["What tests are used to diagnose cancer?", "What is a biopsy?", "When should I call the care team urgently?"],
      topic: "biopsy"
    },
    results: {
      title: "I can't interpret your child's results",
      blocks: [
        { p: [
          "I can explain what the words in a report generally mean, but I can't say whether your child's numbers or findings are normal, good or worrying. Normal ranges vary with age and between laboratories, and what is safe during treatment depends on your child's plan.",
          "**Please go through the results with your child's treating team.** If the results came with instructions, or your child is unwell, contact the team now."
        ] }
      ],
      askTeam: ["What do these results mean for my child?", "Is anything in this report a concern right now?", "Does this change the treatment plan?", "When will the next test be?"],
      followUps: ["What are blood counts?", "What is a pathology report?", "How can I keep my child's medical records organised?"],
      topic: "blood-tests"
    },
    prognosis: {
      title: "Questions about what will happen",
      blocks: [
        { p: [
          "This is one of the hardest questions any family faces, and it's natural to want an answer. I can't estimate what will happen to your child, and I won't give survival numbers for an individual child.",
          "Outlook in childhood cancer depends on many things: the exact type and subtype, the stage or risk group, how the cancer responds to treatment, and access to timely care. Published figures describe large groups of children treated in the past. They cannot predict what will happen to one child.",
          "**Your child's oncology team is the right place to ask.** You can choose how much you want to know, and you can ask them to explain things gradually."
        ] }
      ],
      askTeam: ["What are the goals of my child's treatment?", "What do you expect in my child's situation?", "What would make you more or less hopeful?", "Who can support us while we take this in?"],
      followUps: ["What does stage mean?", "What does remission mean?", "How do I look after myself?"],
      topic: "staging-risk"
    },
    "treatment-decision": {
      title: "Decisions about treatment belong with your child's team",
      blocks: [
        { p: [
          "I can't recommend whether to start, stop, delay or change any treatment. Treatment plans are built around each child's diagnosis, test results and response, and **stopping or changing treatment without the team can be harmful.**",
          "If you have doubts, they are worth raising. Common reasons families worry include side effects, costs, travel, or advice from relatives. The team can often help with these, for example with medicines for side effects, social work support, or adjusting appointments. You can also ask for a second opinion."
        ] }
      ],
      askTeam: ["Why do you recommend this treatment for my child?", "What would happen if we delayed or changed it?", "Are there other options?", "Can we get a second opinion without delaying care?"],
      followUps: ["How is treatment planned?", "Can we get a second opinion?", "Are herbal remedies or supplements safe?", "Is there help with costs and practical problems?"],
      topic: "treatment-overview"
    },
    dosage: {
      title: "I can't advise on medicine doses",
      blocks: [
        { p: [
          "I'm not able to recommend doses or tell you whether to give a particular medicine. During cancer treatment, even common medicines for fever or pain may not be suitable, and some can hide a fever.",
          "**Please check with your child's treating team or pharmacist** before giving any medicine, and follow the prescription exactly. If you think too much medicine has been given, contact the team or emergency services straight away."
        ] }
      ],
      askTeam: ["Which medicines can we give at home for fever or pain, and how much?", "What should we do if a dose is missed or vomited?"],
      followUps: ["How do I read a prescription?", "How is pain managed?", "Why is fever dangerous during chemotherapy?"],
      topic: "prescriptions"
    }
  };

  function boundaryResponse(safety, question) {
    var c = BOUNDARY_CONTENT[safety.ruleId];
    var r = base("boundary");
    r.boundary = safety.ruleId;
    r.title = c.title;
    r.blocks = JSON.parse(JSON.stringify(c.blocks));
    r.askTeam = c.askTeam.slice();
    r.followUps = c.followUps.slice();
    // Explain any recognisable terms the person mentioned, without interpreting them.
    var terms = [];
    var qn = " " + T.normalize(question) + " ";
    getGlossaryIndex().forEach(function (gi) {
      if (gi.key.length >= 2 && qn.indexOf(" " + gi.key + " ") !== -1 && terms.indexOf(gi.entry) === -1 && gi.key !== "all") terms.push(gi.entry);
    });
    if (terms.length) {
      r.blocks.push({ h: "Words you mentioned, in general terms", list: terms.slice(0, 4).map(function (g) { return "**" + g.term + ":** " + g.definition; }) });
    }
    if (safety.ruleId === "treatment-decision" && /ayurved|homeopath|herbal|natural|unani|siddha|home remed/.test(qn)) {
      r.followUps.unshift("Are herbal remedies or supplements safe?");
    }
    r.followUps = r.followUps.filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, 4);
    if (safety.symptoms && safety.symptoms.length) r.notices.push({ type: "urgent", text: urgentBannerText(safety) });
    return r;
  }

  /* ---------------- Conversation intents ---------------- */

  var INTENTS = [
    { id: "greeting", re: /^(hi|hello|hey|hii+|namaste|namaskar|good (morning|afternoon|evening)|hello there|hey there)( there)?$/ },
    { id: "thanks", re: /^(thanks|thank you|thank you so much|thanks a lot|ok thanks|okay thanks|thx|ty|thank u|that helps|that helped|helpful|great thanks)$/ },
    { id: "identity", re: /\b(who are you|what are you|are you (a |an )?(doctor|nurse|human|person|real|robot|bot|ai|chatgpt|machine)|is this (a )?(real )?(doctor|person|human)|am i talking to)\b/ },
    { id: "help", re: /^(help|help me|what can you do|what can you help with|what do you know|what can i ask|menu|options|topics|start)$/ },
    { id: "more", re: /^(more|tell me more|more please|explain more|more details|more detail|more info|go on|continue|and|elaborate|say more|details)$/ },
    { id: "open-glossary", re: /\b(open|show|go to|see)\b.*\bglossary\b|^glossary$/ },
    { id: "open-checklist", re: /\b(open|show|go to|see)\b.*\b(checklist|question list)\b|^checklist$/ },
    { id: "open-library", re: /\b(open|show|go to|browse|see)\b.*\b(topic library|library|all topics|topics)\b/ },
    { id: "privacy", re: /\b(is (this|our|my|the) ?(conversation|chat|data|information)? (private|confidential|safe|secure)|do you (store|save|keep|record|share) (my|our|this|the)|who can see (this|my|our)|is my data|privacy)\b/ }
  ];

  function intentResponse(id, state) {
    var r = base("meta");
    switch (id) {
      case "greeting":
        r.title = "Hello";
        r.blocks = [{ p: ["I can explain childhood cancer terms, tests, treatments, side effects and practical matters in plain language. What would you like to understand?"] }];
        r.followUps = ["What does biopsy mean?", "What happens during chemotherapy?", "What should I ask the doctor tomorrow?"];
        return r;
      case "thanks":
        r.title = "You're welcome";
        r.blocks = [{ p: ["I'm glad that helped. You can ask another question any time, or add questions to your Appointment checklist to take to the team."] }];
        r.followUps = ["Open the appointment checklist", "What should I ask the doctor tomorrow?"];
        return r;
      case "identity":
        r.title = "About this assistant";
        r.blocks = [{ p: [
          "I'm not a doctor, nurse or a person. I'm a prototype information tool that answers from a curated library of general educational content about childhood cancer, written in plain language and linked to public sources such as the National Cancer Institute.",
          "My answers are not generated by an AI language model and have not been reviewed by clinicians for this prototype. I can't give advice about your child. Your child's treating team is always the right source for decisions about their care."
        ] }];
        r.followUps = ["What can you help with?", "Is this conversation private?"];
        return r;
      case "privacy":
        r.title = "Your privacy";
        r.blocks = [{ p: [
          "This conversation stays in your browser. It is not sent to a server, there is no login, and there is no tracking. The conversation is cleared when you start a new conversation or close the page.",
          "You don't need to share your child's name, hospital number or other identifying details to use this tool. This prototype is not a medical record system and does not claim to meet healthcare privacy standards."
        ] }];
        r.followUps = ["What can you help with?"];
        return r;
      case "help":
        r.title = "What I can help with";
        r.blocks = [{ p: ["I can explain general information about childhood cancer in plain language. You can ask a question in your own words, or pick an area:"] }];
        r.choices = CSC.categories.slice(0, 12).map(function (c) { return { label: c.title, categoryId: c.id }; });
        r.followUps = ["What does remission mean?", "Will my child lose their hair?", "How can I explain cancer to my younger child?"];
        return r;
      case "more":
        var t = state.lastTopicId && CSC.getTopic(state.lastTopicId);
        if (t) { var rr = topicResponse(t, { expanded: true }); rr.lead = null; rr.title = t.title; return rr; }
        return null;
      case "open-glossary":
        r.kind = "navigate"; r.action = { view: "glossary" }; r.title = "Opening the glossary";
        r.blocks = [{ p: ["The glossary explains common medical words in plain language. You can search it or browse from A to Z."] }];
        return r;
      case "open-checklist":
        r.kind = "navigate"; r.action = { view: "checklist" }; r.title = "Opening your appointment checklist";
        r.blocks = [{ p: ["Pick the questions you want to ask, add your own, then copy the list to take with you."] }];
        return r;
      case "open-library":
        r.kind = "navigate"; r.action = { view: "library" }; r.title = "Opening the topic library";
        r.blocks = [{ p: ["Browse every topic by category. Choosing a topic shows it here in the conversation."] }];
        return r;
    }
    return null;
  }

  /* ---------------- Fallback and clarification ---------------- */

  function fallbackResponse(candidates) {
    var r = base("fallback");
    r.title = "I'm not sure I have information on that";
    r.blocks = [{ p: [
      "I may not have understood, or this may be outside what this library covers. I only answer from a fixed set of topics about childhood cancer, so I'd rather say so than guess.",
      "You could try asking in a different way, using a key word such as \"chemotherapy\", \"biopsy\" or \"fever\", or browse the topic library."
    ] }];
    var seen = {};
    r.choices = [];
    (candidates || []).forEach(function (c) {
      if (r.choices.length >= 3 || seen[c.topicId] || c.score < 1.5) return;
      seen[c.topicId] = 1;
      r.choices.push({ label: CSC.getTopic(c.topicId).title, topicId: c.topicId });
    });
    if (r.choices.length) r.blocks[0].p.push("These topics might be close to what you're looking for:");
    r.followUps = ["What can you help with?", "Open the topic library"];
    r.notices.push({ type: "info", text: "If your question is about your child's health right now, please contact their treating team." });
    return r;
  }

  function clarifyResponse(a, b) {
    var r = base("clarify");
    var ta = CSC.getTopic(a.topicId), tb = CSC.getTopic(b.topicId);
    r.title = "Which of these did you mean?";
    r.blocks = [{ p: ["Your question could fit more than one topic. Choose the one that's closest, or ask again with a few more words."] }];
    r.choices = [
      a.type === "faq" ? { label: a.faqQ, docId: a.id, topicId: a.topicId } : { label: ta.title, topicId: ta.id },
      b.type === "faq" ? { label: b.faqQ, docId: b.id, topicId: b.topicId } : { label: tb.title, topicId: tb.id }
    ];
    return r;
  }

  /* ---------------- Main entry ---------------- */

  /* Clearly unrelated subjects. These go straight to the honest fallback. */
  var OFF_TOPIC_RE = /\b(weather|cricket|ipl|football|movie|movies|film|song|songs|lyrics|poem|joke|recipe|cake|stock|stocks|bitcoin|crypto|python code|javascript|homework help|election|horoscope|game score)\b/;

  var FOLLOW_UP_RE = /^(and|also|so|but|what about|how about|how long|how often|how many|is it|does it|will it|can it|do they|are they|is that|does that|why|when|where|then)\b|\b(it|that|this|they|them|those|these)\b/;
  var DEFINITION_RE = /^(what does|what do|what is|what are|what s|whats|define|definition of|meaning of|explain the word|explain the term|what is meant by|what is the meaning of|what does the word|what does the term)\s+(.+?)(\s+(mean|means|stand for|stands for|mean in|refer to))?\s*\??$/;
  var MEANING_SUFFIX_RE = /^(.+?)\s+(meaning|means|definition|full form|stands for)\s*\??$/;

  function newState() { return { lastTopicId: null, lastDocId: null, turns: 0 }; }

  function finalize(r, state, extra) {
    if (r.topicId) { state.lastTopicId = r.topicId; state.lastDocId = r.docId; }
    state.turns++;
    r.debug = extra || {};
    return r;
  }

  function respond(input, state) {
    state = state || newState();
    var text = String(input == null ? "" : input).trim();
    if (!text) {
      var e = base("meta");
      e.title = "Type a question to get started";
      e.blocks = [{ p: ["You can ask in your own words, for example \"What does remission mean?\""] }];
      return e;
    }
    if (text.length > CONFIG.maxInputLength) text = text.slice(0, CONFIG.maxInputLength);

    var safety = CSC.safety.classify(text);
    var dbg = { safety: { tier: safety.tier, rule: safety.ruleId, symptoms: safety.symptoms.map(function (s) { return s.id; }), report: safety.isReport, educational: safety.isEducational, pastOnly: safety.isPastOnly } };

    if (safety.tier === "crisis") return finalize(crisisResponse(), state, dbg);
    if (safety.tier === "emergency") return finalize(emergencyResponse(safety), state, dbg);
    if (safety.tier === "urgent") return finalize(urgentResponse(safety), state, dbg);
    if (safety.tier === "boundary") {
      var b = boundaryResponse(safety, text);
      if (safety.privacy) b.notices.unshift(privacyNotice());
      return finalize(b, state, dbg);
    }

    var norm = T.normalize(text).replace(/\?+$/, "").trim();
    var r = null;

    for (var i = 0; i < INTENTS.length; i++) {
      if (INTENTS[i].re.test(norm)) { r = intentResponse(INTENTS[i].id, state); if (r) break; }
    }

    if (!r) r = answerQuestion(text, norm, state, dbg);

    if (safety.banner && r.kind !== "meta") {
      if (!r.notices.some(function (n) { return n.type === "urgent"; })) r.notices.unshift({ type: "urgent", text: urgentBannerText(safety) });
      else r.notices = r.notices.map(function (n) { return n.type === "urgent" ? { type: "urgent", text: urgentBannerText(safety) } : n; });
    }
    if (safety.privacy) r.notices.unshift(privacyNotice());
    if (safety.distress && (r.kind === "answer" || r.kind === "faq")) r.opener = DISTRESS_OPENERS[hash(text) % DISTRESS_OPENERS.length];
    return finalize(r, state, dbg);
  }

  function privacyNotice() {
    return { type: "privacy", text: "You don't need to share names, phone numbers or hospital ID numbers here. Nothing is sent anywhere, but it's safest to leave them out." };
  }

  function answerQuestion(text, norm, state, dbg) {
    // Definition lookups: "what does X mean", "define X", "X meaning"
    var defMatch = DEFINITION_RE.exec(norm) || MEANING_SUFFIX_RE.exec(norm);
    var glossaryHit = null;
    if (defMatch) {
      var phrase = (DEFINITION_RE.test(norm) ? DEFINITION_RE.exec(norm)[2] : MEANING_SUFFIX_RE.exec(norm)[1]).trim();
      phrase = phrase.replace(/^(a|an|the)\s+/, "");
      glossaryHit = lookupGlossary(phrase);
      // Definitions of ALL only when the person typed the acronym in capitals.
      if (glossaryHit && /^all$/i.test(phrase) && !/\bALL\b/.test(text)) glossaryHit = null;
    }

    var tokenCount = T.tokenize(text).length;
    var isFollowUp = !!state.lastTopicId && tokenCount <= 4 && FOLLOW_UP_RE.test(norm);
    var res = CSC.retrieval.search(text, { lastTopicId: state.lastTopicId, isFollowUp: isFollowUp });
    var c = res.candidates;
    dbg.retrieval = { followUp: isFollowUp, fuzzy: res.fuzzy, tokens: res.tokens.map(function (t) { return t.tok; }), candidates: c.slice(0, 4).map(function (x) { return { id: x.id, topic: x.topicId, score: x.score }; }) };

    if (glossaryHit) {
      dbg.glossary = glossaryHit.term;
      var top = c[0];
      if (glossaryHit.topic && top && top.topicId === glossaryHit.topic && top.score >= CONFIG.minScore) {
        var tr = buildAnswer(top, text);
        tr.lead = { term: glossaryHit.term, text: glossaryHit.definition };
        return tr;
      }
      var d = base("definition");
      d.title = glossaryHit.term;
      d.blocks = [{ p: [glossaryHit.definition] }];
      d.sources = ["nci-dictionary"];
      if (glossaryHit.topic) {
        var gt = CSC.getTopic(glossaryHit.topic);
        if (gt) { d.choices = [{ label: "Learn more: " + gt.title, topicId: gt.id }]; d.topicId = gt.id; d.docId = "glossary:" + glossaryHit.term; d.category = gt.category; }
      }
      d.followUps = ["Open the glossary"];
      return d;
    }

    // Fall back when the score is low, or when nothing specific matched
    // (only incidental words like "today" overlapping a question variant).
    if (OFF_TOPIC_RE.test(norm) && !(c[0] && c[0].strong && c[0].score >= 12)) return fallbackResponse([]);
    var contextCarried = isFollowUp && c.length && c[0].topicId === state.lastTopicId;
    if (!c.length || c[0].score < CONFIG.minScore || (!c[0].strong && c[0].patternSim < 0.6 && !contextCarried)) {
      // A very short follow-up we couldn't place: offer the last topic again.
      return fallbackResponse(c);
    }

    var first = c[0];
    // Avoid repeating the exact answer just given for a vague follow-up.
    if (isFollowUp && first.id === state.lastDocId && c[1] && c[1].score >= first.score * 0.6) first = c[1];

    var second = null;
    for (var i = 1; i < c.length; i++) { if (c[i].topicId !== first.topicId) { second = c[i]; break; } }
    if (second && !isFollowUp && second.score >= first.score * CONFIG.clarifyRatio && first.score < CONFIG.clarifyCeiling) {
      if (second.type === "faq") second.faqQ = findFaq(second.id).faq.q;
      if (first.type === "faq") first.faqQ = findFaq(first.id).faq.q;
      return clarifyResponse(first, second);
    }

    if (isFollowUp && first.id === state.lastDocId && first.type === "topic") {
      // The follow-up points back at the topic just shown: open the full detail rather than repeat the summary.
      var again = topicResponse(CSC.getTopic(first.topicId), { expanded: true, question: text });
      again.notices.push({ type: "info", text: "Here is the full guide on this topic, with the details opened." });
      return again;
    }
    return buildAnswer(first, text);
  }

  function findFaq(faqId) {
    for (var i = 0; i < CSC.topics.length; i++) {
      var faqs = CSC.topics[i].faqs || [];
      for (var j = 0; j < faqs.length; j++) if (faqs[j].id === faqId) return { topic: CSC.topics[i], faq: faqs[j] };
    }
    return null;
  }

  function buildAnswer(candidate, question) {
    if (candidate.type === "faq") {
      var f = findFaq(candidate.id);
      return faqResponse(f.topic, f.faq);
    }
    return topicResponse(CSC.getTopic(candidate.topicId), { question: question });
  }

  /* Used by the topic library, clarifying buttons and "Learn more" links. */
  function respondToTopic(topicId, state, docId) {
    state = state || newState();
    var t = CSC.getTopic(topicId);
    if (!t) return fallbackResponse([]);
    var r;
    if (docId && docId !== topicId) {
      var f = findFaq(docId);
      r = f ? faqResponse(f.topic, f.faq) : topicResponse(t);
    } else {
      r = topicResponse(t);
    }
    return finalize(r, state, { source: "topic-link" });
  }

  /* Plain-text version of a response, for the Copy button. */
  function toPlainText(r) {
    var strip = function (s) { return String(s).replace(/\*\*/g, ""); };
    var out = [];
    if (r.title) out.push(r.title.toUpperCase(), "");
    (r.notices || []).forEach(function (n) { out.push("Note: " + strip(n.text), ""); });
    if (r.lead) out.push("In short: " + strip(r.lead.text), "");
    if (r.opener) out.push(strip(r.opener), "");
    var addBlocks = function (blocks) {
      (blocks || []).forEach(function (b) {
        if (b.h) out.push(strip(b.h));
        (b.p || []).forEach(function (p) { out.push(strip(p)); });
        (b.list || []).forEach(function (l) { out.push("- " + strip(l)); });
        out.push("");
      });
    };
    addBlocks(r.blocks);
    addBlocks(r.more);
    if (r.askTeam && r.askTeam.length) {
      out.push("Questions you can ask your care team:");
      r.askTeam.forEach(function (q) { out.push("- " + q); });
      out.push("");
    }
    if (r.sources && r.sources.length) {
      out.push("Sources:");
      r.sources.forEach(function (id) { var s = CSC.sources[id]; if (s) out.push("- " + s.org + ", " + s.title + ": " + s.url); });
      out.push("");
    }
    out.push("General information only, not medical advice. Please discuss your child's care with their treating team.");
    return out.join("\n");
  }

  CSC.engine = {
    CONFIG: CONFIG,
    newState: newState,
    respond: respond,
    respondToTopic: respondToTopic,
    toPlainText: toPlainText,
    lookupGlossary: lookupGlossary,
    termsInText: termsInText
  };
})(typeof window !== "undefined" ? window : globalThis);
