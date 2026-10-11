/*
 * Automated tests for the knowledge base, retrieval and safety logic.
 * Run with:  node tests/engine.test.js
 * No dependencies. Exits with code 1 if any test fails.
 */
"use strict";
var fs = require("fs");
var path = require("path");
var CSC = require("./load")();
var E = CSC.engine;

var passed = 0, failed = 0, failures = [];
function test(name, fn) {
  try { fn(); passed++; }
  catch (e) { failed++; failures.push(name + "\n      " + e.message); }
}
function eq(a, b, msg) { if (a !== b) throw new Error((msg || "") + " expected " + JSON.stringify(b) + " but got " + JSON.stringify(a)); }
function ok(v, msg) { if (!v) throw new Error(msg || "expected truthy"); }
function ask(q, state) { return E.respond(q, state || E.newState()); }
function allText(r) { return JSON.stringify([r.title, r.blocks, r.more, r.notices, r.lead]); }

/* ---------- 1. Required example questions ---------- */
var REQUIRED = [
  ["What does biopsy mean?", "biopsy"],
  ["Why does my child need a biopsy?", "biopsy"],
  ["What happens during chemotherapy?", "chemotherapy"],
  ["Will my child lose their hair?", "hair-loss"],
  ["What should I ask the doctor tomorrow?", "preparing-questions"],
  ["What does remission mean?", "remission-relapse"],
  ["How can I explain cancer to my younger child?", "talking-to-child"],
  ["What if I don't understand what the doctor told me?", "not-understanding"]
];
REQUIRED.forEach(function (pair) {
  test("required example: " + pair[0], function () {
    var r = ask(pair[0]);
    ok(r.kind === "answer" || r.kind === "faq", "kind was " + r.kind);
    eq(r.topicId, pair[1], "topic");
  });
});

test("required examples give meaningfully different answers", function () {
  var titles = {};
  REQUIRED.forEach(function (p) { titles[ask(p[0]).title] = 1; });
  ok(Object.keys(titles).length >= 7, "only " + Object.keys(titles).length + " distinct answers");
});

/* ---------- 2. Ordinary educational questions ---------- */
var EDUCATIONAL = [
  ["What is a port?", "central-lines"],
  ["what is an MRI", "scans"],
  ["what is a lumbar puncture", "bone-marrow-lp"],
  ["what is a pathology report", "pathology-report"],
  ["what does stage mean", "staging-risk"],
  ["what is a clinical trial", "clinical-trials"],
  ["what food is safe during chemo", "food-safety"],
  ["can my child go to school during treatment", "school"],
  ["my other kids feel left out", "siblings"],
  ["is there financial help for treatment", "practical-support"],
  ["can we give ayurvedic medicine along with chemo", "herbal-remedies"],
  ["why is my child so angry on steroids", "steroids-mood"],
  ["what are late effects", "late-effects"],
  ["what is a discharge summary", "discharge-summary"],
  ["how do I keep track of all the appointments", "care-notebook"],
  ["what is the difference between ALL and AML", "leukemia"],
  ["what is wilms tumor", "young-child-solid-tumors"],
  ["what is immunotherapy", "immunotherapy"],
  ["what is targeted therapy", "targeted-therapy"],
  ["how do I look after myself", "caring-for-yourself"],
  ["Is cancer contagious?", "what-is-cancer"],
  ["is it my fault my child got cancer", "why-did-this-happen"]
];
EDUCATIONAL.forEach(function (pair) {
  test("educational: " + pair[0], function () { eq(ask(pair[0]).topicId, pair[1], "topic"); });
});

/* ---------- 3. Synonyms, everyday words and misspellings ---------- */
var SYNONYMS = [
  ["hair fall", "hair-loss"],
  ["will she go bald", "hair-loss"],
  ["leukaemia treatment", "leukemia"],
  ["what is blood cancer", "leukemia"],
  ["what is chemotheraphy", "chemotherapy"],
  ["what is a biospy", "biopsy"],
  ["throwing up after chemo", "nausea-vomiting"],
  ["what is a spinal tap", "bone-marrow-lp"],
  ["what is a brain tumour", "brain-tumors"],
  ["what is radiotherapy", "radiation"],
  ["what is a bone marrow transplant", "stem-cell-transplant"],
  ["what is remision", "remission-relapse"],
  ["what is a chemoport", "central-lines"],
  ["he has loose motions after chemo what food helps", "nutrition"]
];
SYNONYMS.forEach(function (pair) {
  test("synonym/misspelling: " + pair[0], function () { eq(ask(pair[0]).topicId, pair[1], "topic"); });
});

/* ---------- 4. Glossary definitions ---------- */
test("definition: what does ANC mean -> glossary or topic with lead", function () {
  var r = ask("what does ANC mean");
  ok(r.kind === "definition" || (r.lead && /neutrophil/i.test(r.lead.text)), "got " + r.kind);
  ok(/neutrophil/i.test(allText(r)));
});
test("definition: biopsy topic carries a short definition lead", function () {
  var r = ask("What does biopsy mean?");
  ok(r.lead && /sample/i.test(r.lead.text), "missing lead");
});
test("glossary lookup handles misspelling", function () {
  ok(E.lookupGlossary("neutropenea"), "no match for neutropenea");
});
test("glossary entries link to real topics", function () {
  CSC.glossary.forEach(function (g) { if (g.topic) ok(CSC.getTopic(g.topic), g.term + " -> " + g.topic); });
});

/* ---------- 5. Unknown and ambiguous questions ---------- */
["what is the weather today", "write me a poem", "how do I bake a cake", "banana", "who won the cricket match"].forEach(function (q) {
  test("unknown -> honest fallback: " + q, function () {
    var r = ask(q);
    eq(r.kind, "fallback");
    ok(/not sure/i.test(r.title));
  });
});
["treatment", "side effects or tests"].forEach(function (q) {
  test("ambiguous -> clarify or offer choices: " + q, function () {
    var r = ask(q);
    ok(r.kind === "clarify" || r.kind === "fallback" || r.kind === "answer", "kind " + r.kind);
    if (r.kind === "clarify") ok(r.choices.length === 2, "two choices");
  });
});
test("empty input is handled without error", function () {
  var r = ask("   ");
  eq(r.kind, "meta");
});
test("very long input is handled", function () {
  var r = ask(new Array(500).join("chemo "));
  ok(r && r.kind);
});

/* ---------- 6. Urgent symptom reports ---------- */
var URGENT = [
  "my son has a fever",
  "My daughter has 101 fever since morning",
  "she has a temperature of 38.5 c",
  "my child's nose is bleeding and it won't stop",
  "his central line is leaking",
  "my baby is very drowsy and floppy",
  "my child keeps vomiting and can't keep water down",
  "should I take her to the hospital?",
  "he is shivering and feels hot to touch"
];
URGENT.forEach(function (q) {
  test("urgent: " + q, function () {
    var r = ask(q);
    ok(r.kind === "urgent" || r.kind === "emergency", "kind was " + r.kind);
    var first = r.blocks[0].p.join(" ");
    ok(/treating team|emergency/i.test(first), "warning must be at the top");
    ok(/112/.test(allText(r)), "emergency number missing");
    eq(r.more.length, 0, "urgent answer should not bury the warning under education");
  });
});

var EMERGENCY = ["she is not breathing", "my child had a seizure", "he is unconscious and won't wake up", "my son swallowed his tablets", "her lips are turning blue"];
EMERGENCY.forEach(function (q) {
  test("emergency: " + q, function () {
    var r = ask(q);
    eq(r.kind, "emergency");
    ok(/112/.test(r.blocks[0].p[0]), "112 must be in the first line");
  });
});

test("urgent response for fever mentions checking before fever medicine", function () {
  ok(/fever medicine/i.test(allText(ask("my son has a fever"))));
});
test("urgent response does not imply missing symptoms mean safety", function () {
  var t = allText(ask("my son has a fever"));
  ok(!/(is|are) (safe|fine|okay|normal) (if|when|unless)/i.test(t), "found reassurance pattern");
});

/* ---------- 7. Educational mentions of symptoms are not takeovers ---------- */
test("educational fever question gets education plus a banner", function () {
  var r = ask("Why is fever dangerous during chemotherapy?");
  eq(r.topicId, "low-counts-infection");
  ok(r.notices.some(function (n) { return n.type === "urgent"; }), "urgent banner expected");
});
test("what is febrile neutropenia is not an urgent takeover", function () {
  var r = ask("what is febrile neutropenia");
  ok(r.kind !== "urgent" && r.kind !== "emergency", r.kind);
});
test("past symptom is not an urgent takeover but keeps a banner", function () {
  var r = ask("my son had a fever last week, will chemo be delayed again");
  ok(r.kind !== "urgent", "kind " + r.kind);
  ok(r.notices.some(function (n) { return n.type === "urgent"; }), "banner expected");
});
test("vomiting after chemo (no severity) answers with a banner", function () {
  var r = ask("is it normal for my child to vomit after chemo");
  eq(r.topicId, "nausea-vomiting");
  ok(r.notices.some(function (n) { return n.type === "urgent"; }));
});

/* ---------- 8. Crisis ---------- */
["I want to die", "I feel like killing myself", "my son says he wants to die"].forEach(function (q) {
  test("crisis: " + q, function () {
    var r = ask(q);
    eq(r.kind, "crisis");
    ok(/14416/.test(allText(r)) && /112/.test(allText(r)));
  });
});
test("parent asking how to answer a child's question about dying is not a crisis", function () {
  var r = ask("my child asked if they are going to die, how do I answer");
  eq(r.topicId, "talking-to-child");
});

/* ---------- 9. Unsafe personalised requests ---------- */
var BOUNDARIES = [
  ["is it cancer?", "diagnose"],
  ["does my son have leukemia", "diagnose"],
  ["could these bruises be leukemia", "diagnose"],
  ["has the cancer come back", "diagnose"],
  ["his platelets are 20000 is that bad", "results"],
  ["my child's report says malignant round cell tumor what does it mean", "results"],
  ["is her hb count normal", "results"],
  ["will my child survive", "prognosis"],
  ["what are her chances", "prognosis"],
  ["what is the survival rate for leukemia", "prognosis"],
  ["is my child going to die", "prognosis"],
  ["should we stop chemo and try ayurveda", "treatment-decision"],
  ["can we skip chemo this week because she is tired", "treatment-decision"],
  ["should my daughter have the surgery", "treatment-decision"],
  ["we want to use homeopathy instead of chemo", "treatment-decision"],
  ["which treatment is best for my son", "treatment-decision"],
  ["how much paracetamol can I give", "dosage"],
  ["can i give him crocin", "dosage"],
  ["what dose of ondansetron should she take", "dosage"]
];
BOUNDARIES.forEach(function (pair) {
  test("boundary (" + pair[1] + "): " + pair[0], function () {
    var r = ask(pair[0]);
    eq(r.kind, "boundary", "kind");
    eq(r.boundary, pair[1], "boundary type");
    ok(r.askTeam.length >= 2, "should suggest questions for the team");
  });
});
test("boundary responses never contain dose numbers or survival percentages", function () {
  BOUNDARIES.forEach(function (p) {
    var t = allText(ask(p[0]));
    ok(!/\d+\s?(mg|ml|%)/i.test(t), "found number in " + p[0]);
  });
});
test("results boundary explains terms the person mentioned", function () {
  var r = ask("my child's report says malignant round cell tumor what does it mean");
  ok(/Malignant/.test(allText(r)), "should define malignant");
});
test("herbal 'instead of chemo' suggests the herbal topic", function () {
  ok(ask("we want to use homeopathy instead of chemo").followUps.indexOf("Are herbal remedies or supplements safe?") !== -1);
});

/* ---------- 10. Privacy ---------- */
test("identifying details trigger a privacy notice", function () {
  var r = ask("my son's UHID is 4455667, what is a biopsy");
  ok(r.notices.some(function (n) { return n.type === "privacy"; }));
});
test("phone number triggers a privacy notice", function () {
  ok(ask("call me on 9876543210 about chemo").notices.some(function (n) { return n.type === "privacy"; }));
});

/* ---------- 11. Conversation context ---------- */
test("follow-up 'does it hurt?' after chemo answers the chemo FAQ", function () {
  var s = E.newState();
  ask("What happens during chemotherapy?", s);
  eq(ask("does it hurt?", s).docId, "chemo-hurt");
});
test("follow-up 'does it hurt' after biopsy answers the biopsy FAQ", function () {
  var s = E.newState();
  ask("What is a biopsy?", s);
  eq(ask("does it hurt", s).docId, "biopsy-pain");
});
test("follow-up 'how long does it last' after chemo", function () {
  var s = E.newState();
  ask("what is chemo", s);
  eq(ask("how long does it last?", s).docId, "chemo-duration");
});
test("follow-up 'how do I care for it' after ports stays on ports", function () {
  var s = E.newState();
  ask("what is a port", s);
  eq(ask("how do i care for it", s).topicId, "central-lines");
});
test("'tell me more' expands the last topic", function () {
  var s = E.newState();
  ask("Will my child lose their hair?", s);
  var r = ask("tell me more", s);
  eq(r.topicId, "hair-loss");
  ok(r.expanded);
});
test("a new topic after a follow-up switches context", function () {
  var s = E.newState();
  ask("what is chemo", s);
  eq(ask("what is a pathology report", s).topicId, "pathology-report");
});

/* ---------- 12. Conversation intents ---------- */
test("greeting", function () { eq(ask("hello").title, "Hello"); });
test("identity says it is not a doctor and not an AI model", function () {
  var t = allText(ask("are you a doctor?"));
  ok(/not a doctor/i.test(t) && /not generated by an AI/i.test(t));
});
test("privacy question", function () { ok(/not sent to a server/i.test(allText(ask("is this conversation private?")))); });
test("navigation intent opens glossary", function () { eq(ask("Open the glossary").action.view, "glossary"); });
test("navigation intent opens checklist", function () { eq(ask("Open the appointment checklist").action.view, "checklist"); });
test("help lists categories", function () { ok(ask("what can you help with").choices.length >= 10); });

/* ---------- 13. Knowledge base integrity ---------- */
test("all 13 required content areas are covered", function () {
  var cats = {};
  CSC.topics.forEach(function (t) { cats[t.category] = (cats[t.category] || 0) + 1; });
  CSC.categories.forEach(function (c) { ok(cats[c.id] >= 1, "no topics in " + c.id); });
  ok(CSC.glossary.length >= 60, "glossary too small: " + CSC.glossary.length);
});
test("topic ids are unique", function () {
  var seen = {};
  CSC.topics.forEach(function (t) { ok(!seen[t.id], "duplicate " + t.id); seen[t.id] = 1; });
});
test("every topic has a summary, short answer, patterns and keywords", function () {
  CSC.topics.forEach(function (t) {
    ok(t.summary && t.short && t.short.length && t.patterns.length >= 3 && t.keywords.length >= 3, t.id);
  });
});
test("related topics, categories and sources all exist", function () {
  CSC.topics.forEach(function (t) {
    ok(CSC.getCategory(t.category), t.id + " category");
    (t.related || []).forEach(function (r) { ok(CSC.getTopic(r), t.id + " -> related " + r); });
    (t.sources || []).forEach(function (s) { ok(CSC.sources[s], t.id + " -> source " + s); });
  });
});
test("every source is an https link and marked verified", function () {
  Object.keys(CSC.sources).forEach(function (k) {
    var s = CSC.sources[k];
    ok(/^https:\/\//.test(s.url), k);
    ok(s.verified === true, k + " is not verified");
  });
});
test("each topic answers its own curated question variants", function () {
  var misses = [];
  CSC.topics.forEach(function (t) {
    t.patterns.forEach(function (p) {
      var r = ask(p);
      if (r.kind === "boundary" || r.kind === "urgent" || r.kind === "crisis" || r.kind === "emergency") return;
      if (r.topicId !== t.id) misses.push(p + " -> " + (r.topicId || r.kind));
    });
  });
  ok(misses.length <= 3, misses.length + " misses: " + misses.join("; "));
});
test("every suggested follow-up question leads somewhere useful", function () {
  var bad = [];
  CSC.topics.forEach(function (t) {
    (t.followUps || []).forEach(function (f) {
      var r = ask(f);
      if (r.kind === "fallback" || r.kind === "clarify") bad.push(t.id + ": " + f + " -> " + r.kind);
    });
  });
  ok(!bad.length, bad.join("; "));
});
test("every topic opens from the library", function () {
  CSC.topics.forEach(function (t) { eq(E.respondToTopic(t.id, E.newState()).topicId, t.id); });
});

/* ---------- 14. Content safety checks ---------- */
test("content contains no medicine doses", function () {
  var t = JSON.stringify(CSC.topics) + JSON.stringify(CSC.glossary);
  ok(!/\b\d+(\.\d+)?\s?(mg|mcg|ml|milligram)/i.test(t), "dose found");
});
test("content contains no universal fever thresholds", function () {
  var t = JSON.stringify(CSC.topics);
  ok(!/(38|100\.4|101)\s?(°|degrees|c\b|f\b)/i.test(t), "temperature threshold found");
});
test("content does not claim clinical validation or affiliation", function () {
  var t = JSON.stringify(CSC.topics).toLowerCase();
  ok(!/validated by|approved by|reviewed by (doctors|clinicians|oncologists)|in partnership with/.test(t));
});
test("no em dashes anywhere in the project", function () {
  var root = path.join(__dirname, "..");
  var bad = [];
  (function walk(dir) {
    fs.readdirSync(dir).forEach(function (f) {
      if (f === "node_modules" || f === "dist" || f.charAt(0) === ".") return;
      var p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) return walk(p);
      if (!/\.(js|html|css|md|json|py)$/.test(f)) return;
      if (fs.readFileSync(p, "utf8").indexOf("\u2014") !== -1) bad.push(path.relative(root, p));
    });
  })(root);
  ok(!bad.length, "em dash in " + bad.join(", "));
});

/* ---------- 15. Copy text ---------- */
test("plain-text copy includes title, team questions, sources and disclaimer", function () {
  var t = E.toPlainText(ask("What happens during chemotherapy?"));
  ok(/CHEMOTHERAPY/.test(t) && /Questions you can ask your care team/.test(t) && /cancer\.gov/.test(t) && /not medical advice/.test(t));
  ok(t.indexOf("**") === -1, "markdown leaked");
});

/* ---------- Report ---------- */
console.log("\n" + passed + " passed, " + failed + " failed");
if (failed) {
  console.log("\nFailures:");
  failures.forEach(function (f) { console.log("  x " + f); });
  process.exit(1);
}
