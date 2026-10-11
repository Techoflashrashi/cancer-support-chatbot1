/*
 * Safety classifier.
 *
 * Runs on every message BEFORE retrieval. It decides whether the message
 * needs a safety response instead of (or on top of) an educational answer.
 *
 * Tiers, in priority order:
 *   crisis     thoughts of self-harm or suicide (user or child)
 *   emergency  a possible medical emergency happening now
 *   urgent     a symptom happening now that needs the treating team
 *   boundary   a request for personal medical judgement (diagnosis, results,
 *              prognosis, treatment decisions, doses)
 *   none
 *
 * Symptom words in a clearly educational question ("why is fever dangerous
 * during chemo?") do not trigger the urgent takeover. They add a short
 * banner to the educational answer instead.
 *
 * These are rule-based patterns. They are deliberately cautious, and they
 * can still miss messages. The interface never presents them as a
 * substitute for the treating team.
 */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});

  function any(list, text) {
    for (var i = 0; i < list.length; i++) if (list[i].test(text)) return list[i];
    return null;
  }

  var SUBJECT = "(my|our) (child|son|daughter|baby|kid|boy|girl|toddler|teen|teenager|little one)";

  /* Signals that the message describes something happening to a real person. */
  var REPORT = [
    new RegExp("\\b" + SUBJECT + "\\b"),
    /\b(he|she|they) (is|are|has|have|keeps|keep|cannot|will not|is not|seems|feels|looks|just|suddenly|started|still)\b/,
    /\b(he|she|they) (vomited|fainted|collapsed|fell|bled)\b/,
    /\b(i|we) (have|am|feel|keep|cannot|just|noticed|found|see|saw)\b/,
    /\b(right now|at the moment|currently|tonight|this morning|this evening|since (this|last|yesterday|morning)|since \d|for \d+ (hours|days))\b/,
    /\b\d{2,3}(\.\d)?\s*(°|degrees?|deg)\b/,
    /\b(9[89]|10[0-6]|3[7-9]|4[01])(\.\d)?\s*(f|c)\b/,
    /\b(his|her|their) (temperature|temp|fever|line|port|gums|nose|pee|urine|poo|stool|breathing)\b/
  ];

  /* Phrases that make a message clearly a general question. */
  var EDUCATIONAL = [
    /^(what|why|how|when|explain|define|tell me about|describe|meaning of|is it common|can chemo|does chemo|do children|can children|what are|what is|what does|could (it|this|that|these|those)|might (it|this|these)|are (these|those)|is (this|that) (a|an)? ?(sign|symptom))\b/
  ];

  /* Past-only reports ("she had a fever last week") are not treated as an emergency now. */
  var PAST_ONLY = /\b(last (week|month|year|time|cycle)|(a few|two|three|\d+) (days|weeks|months) ago|yesterday|earlier this (week|month)|in the past|previously|used to)\b/;
  var PRESENT = /\b(now|right now|today|tonight|currently|still|is having|has a|has got|keeps|this morning|this evening)\b/;

  var CRISIS = [
    /\b(kill|killing|hurt|hurting|harm|harming|cut|cutting) (myself|himself|herself|themselves)\b/,
    /\b(suicide|suicidal|self harm|selfharm)\b/,
    /\b(want|wants|wanted) to die\b/,
    /\b(end|ending) (my|his|her|their) life\b/,
    /\b(do not|does not|dont|doesnt) want to (live|be alive|be here)\b/,
    /\bno (reason|point) (to|in) (live|living|going on)\b/,
    /\bbetter off (dead|without me)\b/
  ];

  var EMERGENCY = [
    { id: "breathing", label: "serious breathing problems", re: /\b(not breathing|stopped breathing|cannot breathe|can not breathe|struggling to breathe|gasping|choking|turning blue|blue lips|lips (are|look|turned) blue)\b/ },
    { id: "unresponsive", label: "being unresponsive or hard to wake", re: /\b(unconscious|unresponsive|will not wake|cannot wake|can not wake|not waking|wont wake|passed out|fainted|collapsed)\b/ },
    { id: "seizure", label: "a seizure", re: /\b(seizure|seizures|seizing|convulsion|convulsions|convulsing|having a fit|had a fit|fitting)\b/ },
    { id: "bleeding-severe", label: "heavy bleeding", re: /\b(bleeding (heavily|a lot|badly)|heavy bleeding|bleeding (will not|wont|does not|doesnt|is not) stop|(lot|lots) of blood|vomiting blood|blood in (his|her|the|their)? ?vomit|coughing (up )?blood)\b/ },
    { id: "overdose", label: "a possible medicine overdose", re: /\b(overdose|swallowed (some|the|his|her|all|many|a lot of)? ?(pills|tablets|medicine|medicines|capsules|chemo)|took too (much|many)|gave (him|her|them) too much|double dose by mistake|ate (the|his|her|my)? ?(pills|tablets|medicine))\b/ },
    { id: "anaphylaxis", label: "a severe allergic reaction", re: /\b(anaphylaxis|anaphylactic|face (is )?swelling|swollen face|throat (is )?(swelling|closing|tight)|severe allergic)\b/ }
  ];

  var URGENT = [
    { id: "fever", label: "a fever", re: /\b(fever|febrile|temperature|temp|hot to (the )?touch|chills|shivering|rigors|feverish)\b/ },
    { id: "bleeding", label: "bleeding or unusual bruising", re: /\b(bleeding|bleeds|bled|nosebleed|nose bleed|nose is bleeding|bleeding gums|bruise|bruises|bruising|petechiae|tiny red spots|blood in (his|her|their|the)? ?(urine|pee|stool|poo|poop)|black (stool|poo|poop))\b/ },
    { id: "vomiting-severe", label: "vomiting that stops them keeping fluids or medicines down", re: /\b(cannot keep (anything|food|water|fluids|medicine|medicines|it) down|not keeping (anything|food|water|fluids|medicine|medicines) down|not drinking|will not drink|refusing (to drink|fluids|water)|vomiting (all day|all night|nonstop|non stop|again and again|repeatedly|every hour)|keeps vomiting)\b/ },
    { id: "vomiting", label: "vomiting", soft: true, re: /\b(vomit|vomiting|vomited|vomits)\b/ },
    { id: "dehydration", label: "signs of dehydration", re: /\b(dehydrated|dehydration|no urine|not peeing|has not peed|not passing urine|no wet nappies|no wet diapers)\b/ },
    { id: "diarrhea", label: "diarrhea", soft: true, re: /\b(diarrhea|diarrhoea)\b/ },
    { id: "breathing-mild", label: "breathing problems", re: /\b(breathless|short of breath|shortness of breath|breathing (fast|hard|difficult|problem|problems)|difficulty breathing|trouble breathing|wheezing)\b/ },
    { id: "pain", label: "severe or new pain", re: /\b(severe pain|bad pain|lot of pain|lots of pain|terrible pain|screaming in pain|crying in pain|in (so much|a lot of) pain|severe headache|bad headache|stiff neck|chest pain|tummy pain|stomach pain|belly pain)\b/ },
    { id: "drowsy", label: "unusual drowsiness or confusion", re: /\b(confused|confusion|very drowsy|very sleepy|unusually sleepy|lethargic|floppy|not (himself|herself|themselves)|not acting (like )?(himself|herself|normal))\b/ },
    { id: "line", label: "a problem with a central line or port", re: /\b(line|port|picc|hickman|catheter|central line) (is )?(red|swollen|leaking|broken|cracked|cut|bleeding|painful|came out|fell out|pulled out|blocked)|(red|swelling|redness|pus|leaking|discharge) (around|near|at) (the|his|her|their)? ?(line|port|picc|catheter)\b/ },
    { id: "jaundice", label: "yellowing of the skin or eyes", re: /\b(yellow (eyes|skin)|jaundice|jaundiced)\b/ },
    { id: "rash", label: "a new rash or swelling", soft: true, re: /\b(new rash|rash|swelling|swollen)\b/ },
    { id: "exposure", label: "contact with chickenpox or measles", re: /\b(chicken ?pox|measles|shingles)\b/ },
    { id: "unwell-soft", label: "seeming unwell", soft: true, re: /\b(is|feels|looks|seems|got|has been|getting) (sick|unwell|ill)\b/ },
    { id: "pain-soft", label: "pain", soft: true, re: /\b(is in pain|was in pain|has pain|having pain|complaining of pain|says it hurts|keeps crying)\b/ },
    { id: "unwell", label: "seeming unwell", re: /\b(very unwell|really unwell|seems unwell|looks unwell|very ill|getting worse|much worse|very sick|really sick)\b/ },
    { id: "ask-emergency", label: "this situation", re: /\b(is (this|it) an emergency|should (i|we) (go|take|bring|rush) (him|her|them|my child|my son|my daughter)? ?(to )?(the )?(hospital|er|emergency|casualty|a and e)|should (i|we) call (the )?(doctor|hospital|ambulance|team) (now|tonight))\b/ }
  ];

  var BOUNDARY = [
    {
      id: "diagnose",
      re: [
        /\bis (it|this|that)( lump| swelling| mass| bump| a| an){0,2} (cancer|cancerous|leukemia|tumor|lymphoma|sarcoma|neuroblastoma|relapse|malignant)\b/,
        /\b(could|might|can|would) (it|this|that|these|those|(the|his|her|their|my|these|those) \w+) (be|mean) (a |an )?(sign of |signs of |symptom of |symptoms of )?(cancer|leukemia|tumor|lymphoma|sarcoma|neuroblastoma|relapse|relapsing)\b/,
        /\b(sounds like|are (these|those) (signs|symptoms) of|is (he|she) showing signs of)\b.*\b(cancer|leukemia|tumor|lymphoma|relapse)\b/,
        /\b(does|do|could|might|can) (my|our) \w+ (have|has)\b.*\b(cancer|leukemia|tumor|lymphoma|sarcoma|relapse)\b/,
        /\b(do|could|might) (i|he|she|they) have\b.*\b(cancer|leukemia|tumor|lymphoma|sarcoma)\b/,
        /\bhas (it|the cancer|the leukemia|the tumor) (relapse|come back|returned|spread)\b/,
        /\b(is|has) (he|she|my child|my son|my daughter|it) (relapse|relapsing|relapsed)\b/,
        /\bdiagnose (my|our|him|her|them)\b/
      ]
    },
    {
      id: "results",
      re: [
        /\b(hb|hemoglobin|platelet|platelets|plt|wbc|tlc|anc|neutrophil|neutrophils|blast|blasts|count|counts|creatinine|bilirubin|sgpt|sgot|alt|ast|crp|esr|ldh|mrd|level)\s*(is|are|was|were|of|at|came|dropped|went)?\s*(down to |up to |only |about |around )?\d/,
        /\b(report|reports|result|results|scan|mri|ct|pet|biopsy|blood test|bone marrow|pathology|histopathology) (says|say|said|shows|show|showed|showing|came back|mentions|mentioned|reads|found|finds)\b/,
        /\b(is|are) (this|these|his|her|their|my child|my son|my daughter|the) (\w+ ){0,2}(count|counts|result|results|report|level|levels|number|numbers|value|values) (normal|ok|okay|fine|bad|good|low|high|dangerous|safe|serious|worrying)\b/,
        /\b(interpret|read|explain|check|look at) (my|our|his|her|their|this|the) (child|son|daughter)?\s*(report|reports|result|results|scan|blood test|values|counts)\b/,
        /\bwhat does (my|our|his|her) (child|son|daughter)?\s*(report|result|results|scan|blood test)\b/
      ]
    },
    {
      id: "prognosis",
      re: [
        /\b(survival|survive|surviving|survivability|prognosis|life expectancy|cure rate|odds|chances?|likelihood) (rate|rates|of|for)?\b/,
        /\bwill (he|she|they|my child|my son|my daughter|my baby|our child|i) (die|live|survive|make it|be okay|be ok|be alright|be all right|be fine|get better|be cured|recover|beat (it|this))\b/,
        /\b(is|are) (it|this|he|she|they|my child|leukemia|cancer) (curable|terminal|fatal)\b/,
        /\bhow long (does|do|will) (he|she|they|my child|my son|my daughter|i) (have|live|survive)\b/,
        /\b(going to|gonna) die\b/,
        /\bwhat are (his|her|their|my|our) chances\b/
      ]
    },
    {
      id: "treatment-decision",
      re: [
        /\b(should|can|could|may|must|shall) (we|i|he|she|they|my child|my son|my daughter) (stop|skip|delay|postpone|pause|quit|refuse|reduce|cut|change|switch|cancel|avoid|miss|discontinue|not have|not do|not take|not give)\b/,
        /\b(is it|would it be) (ok|okay|safe|fine|alright|bad|wrong) to (stop|skip|delay|postpone|pause|quit|refuse|reduce|change|switch|cancel|miss|discontinue)\b/,
        /\b(want|wants|thinking of|plan|planning|going|decided|decide) to (stop|skip|delay|postpone|pause|quit|refuse|reduce|change|switch|cancel|discontinue)\b.*\b(chemo|chemotherapy|treatment|radiation|medicine|medicines|medication|tablets|steroids|dose|protocol|transplant|surgery|therapy)\b/,
        /\binstead of (chemo|chemotherapy|treatment|radiation|surgery|transplant|medicine|medicines|the hospital|doctors)\b/,
        /\b(should|do) (we|i|he|she|my child|my son|my daughter) (have|get|do|start|choose|go for|take|agree to|accept) (the )?(chemo|chemotherapy|surgery|operation|radiation|transplant|immunotherapy|trial|clinical trial|amputation|treatment)\b/,
        /\bwhich (treatment|option|hospital|protocol) is (best|better|right) for (my|our|him|her)\b/,
        /\b(do|does) (we|my child|my son|my daughter|he|she) (really )?(need|have to) (the )?(chemo|chemotherapy|surgery|radiation|transplant|treatment)\b/
      ]
    },
    {
      id: "dosage",
      re: [
        /\b(how (much|many)|what dose|which dose|dosage|dose of|doses of|how many (ml|mg|tablets|drops|spoons|teaspoons))\b.*\b(paracetamol|acetaminophen|crocin|calpol|dolo|ibuprofen|brufen|combiflam|meftal|ondansetron|emeset|antibiotic|antibiotics|medicine|medicines|medication|syrup|tablet|tablets|steroid|steroids|dexamethasone|prednisolone|morphine|vitamin|vitamins|chemo|painkiller|painkillers|give)\b/,
        /\b(can|should|may|shall) (i|we) give (him|her|them|my child|my son|my daughter|my baby)?\s*(some |a |an )?(paracetamol|acetaminophen|crocin|calpol|dolo|ibuprofen|brufen|combiflam|meftal|aspirin|disprin|antibiotic|antibiotics|painkiller|painkillers|cough syrup|syrup|medicine|tablet)\b/,
        /\b\d+\s*(mg|ml|mcg)\b/,
        /\b(double|increase|decrease|extra) (the )?dose\b/
      ]
    }
  ];

  var PRIVACY = [
    /\b(\+?91[\s-]?)?[6-9]\d{9}\b/,
    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/,
    /\b(mrn|uhid|uh id|registration (no|number)|reg no|case (no|number)|patient id|hospital id|ip (no|number)|opd (no|number)|aadhaar|aadhar)\b/,
    /\b(my|our) (son|daughter|child|baby) (name is|is called|is named)\b/
  ];

  var DISTRESS = /\b(scared|terrified|afraid|frightened|so worried|very worried|cannot cope|can not cope|overwhelmed|falling apart|breaking down|so stressed|panicking|panic|crying|cannot stop crying|heartbroken|devastated|lost|helpless|hopeless|exhausted|so tired of)\b/;

  function classify(rawText) {
    var t = CSC.text.normalize(rawText);
    var result = {
      tier: "none",
      ruleId: null,
      symptoms: [],
      isReport: !!any(REPORT, t),
      isEducational: !!any(EDUCATIONAL, t),
      isPastOnly: PAST_ONLY.test(t) && !PRESENT.test(t),
      banner: false,
      privacy: !!any(PRIVACY, String(rawText || "").toLowerCase()),
      distress: DISTRESS.test(t),
      normalized: t
    };

    // Someone asking how to answer a child's question about dying is a parenting
    // question, not a prognosis or crisis request.
    var aboutAnsweringChild = /\b(asked|asks|asking|keeps asking|said|says) (me )?(if|whether|why|about)\b|\bhow (do|can|should) (i|we) (answer|explain|tell|respond|talk)\b/.test(t);

    if (!aboutAnsweringChild && any(CRISIS, t)) {
      result.tier = "crisis";
      result.ruleId = "crisis";
      return result;
    }
    if (any(CRISIS, t)) {
      // A child talking about not wanting to live is still serious; flag it in the answer.
      result.banner = true;
      result.crisisMention = true;
    }

    var reportNow = result.isReport && !result.isPastOnly && !(result.isEducational && !new RegExp("\\b" + SUBJECT + "\\b").test(t) && !/\b(he|she|they) (is|has|keeps)\b/.test(t));

    for (var i = 0; i < EMERGENCY.length; i++) {
      if (EMERGENCY[i].re.test(t)) result.symptoms.push({ id: EMERGENCY[i].id, label: EMERGENCY[i].label, level: "emergency" });
    }
    for (i = 0; i < URGENT.length; i++) {
      if (URGENT[i].re.test(t)) result.symptoms.push({ id: URGENT[i].id, label: URGENT[i].label, level: "urgent", soft: !!URGENT[i].soft });
    }

    var hasEmergency = result.symptoms.some(function (s) { return s.level === "emergency"; });
    var hasUrgent = result.symptoms.some(function (s) { return s.level === "urgent" && !s.soft; });
    var hasSoft = result.symptoms.some(function (s) { return s.soft; });
    var askedIfEmergency = result.symptoms.some(function (s) { return s.id === "ask-emergency"; });

    if (hasEmergency && (reportNow || !result.isEducational)) {
      result.tier = "emergency";
      result.ruleId = "emergency";
      return result;
    }
    var statedNow = !result.isEducational && !result.isPastOnly;
    if (hasUrgent && (reportNow || statedNow || askedIfEmergency)) {
      result.tier = "urgent";
      result.ruleId = "urgent";
      return result;
    }
    if (hasUrgent || hasEmergency || hasSoft) result.banner = true;

    if (!aboutAnsweringChild) {
      for (i = 0; i < BOUNDARY.length; i++) {
        if (any(BOUNDARY[i].re, t)) {
          result.tier = "boundary";
          result.ruleId = BOUNDARY[i].id;
          return result;
        }
      }
    }
    return result;
  }

  CSC.safety = { classify: classify };
})(typeof window !== "undefined" ? window : globalThis);
