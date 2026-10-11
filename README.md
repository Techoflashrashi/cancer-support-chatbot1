# Cancer Support Chatbot

A working prototype of a plain-language information assistant for families of children with cancer, and for older children and teenagers themselves. People ask questions in their own words and get short, calm, sourced explanations, plus questions they can take back to their child's care team.

It runs entirely in the browser from a curated local knowledge base. It needs no API key, account, server, database or internet connection (fonts load from Google Fonts when online and fall back to system fonts offline).

**This is an independent prototype.** It is not affiliated with or endorsed by Tata Memorial Centre or any other organisation, has not been clinically validated or reviewed by doctors, and has not been used with patients. It gives general educational information only.

---

## Quick start

No installation is needed.

**Option 1: open the file.** Double-click `index.html` (or `dist/cancer-support-chatbot.html`, the same app in one file). It works from `file://` in Chrome, Edge, Firefox and Safari.

**Option 2: serve it locally** (useful on some locked-down machines):

```bash
cd cancer-support-chatbot
python3 -m http.server 8000
# then open http://localhost:8000
```

### Requirements

| Task | Needs |
|---|---|
| Use the app | Any modern browser |
| Run engine tests | Node.js 16 or newer (no npm packages) |
| Run browser tests | Python 3.8+, `pip install playwright`, `python -m playwright install chromium` |
| Rebuild the single-file version | Node.js |

---

## Testing

```bash
node tests/engine.test.js        # 131 tests: retrieval, safety, content integrity
python3 tests/ui_smoke.py        # 40 checks in a real browser (desktop + mobile)
python3 tests/ui_smoke.py --dist # same checks against the single-file build
```

All three were run before delivery and passed (131/131, 40/40, 40/40). The browser test also writes screenshots to `tests/screenshots/`.

**Engine tests cover:** the eight required example questions; 22 other educational questions; synonyms, British/Indian spellings and misspellings; glossary definitions; unknown and ambiguous questions; empty and very long input; urgent and emergency symptom reports; educational questions that mention symptoms (no takeover); past symptoms; crisis language; 19 unsafe personal requests (diagnosis, results, prognosis, treatment decisions, doses); privacy notices; follow-up context; every topic answers its own question variants; every suggested follow-up leads to a real answer; every related topic, glossary link and source exists; every source is https and verified; content has no doses, fever thresholds or validation claims; no em dashes anywhere; copy text format.

**Browser tests cover:** launch with no script errors, welcome screen, suggested questions, Enter to send, relevant and distinct answers, follow-up context, Read more, glossary chips, synonyms, fallback, urgent card, boundary replies, Copy (clipboard content checked), Add to checklist, topic library and filtering, glossary search and empty states, checklist ticking, custom questions and copy, opt-in storage (and deletion when turned off), conversation never stored, match inspector, New conversation clears the transcript and context, empty message ignored, every button has an accessible name, dark theme, and on a 390px phone: no horizontal scroll, drawer navigation, sending.

---

## Project structure

```
cancer-support-chatbot/
├── index.html                 App shell: views, About and How it works pages
├── styles/app.css             All styles (light and dark themes, responsive)
├── src/
│   ├── manifest.json          Load order of data and engine files (used by tests and build)
│   ├── data/                  CONTENT ONLY, no logic
│   │   ├── sources.js         Verified source registry
│   │   ├── categories.js      12 categories + the addTopics() registry
│   │   ├── topics-*.js        61 topics and 5 short FAQs, grouped by area
│   │   ├── glossary.js        85 plain-language terms
│   │   └── checklist.js       Appointment question bank
│   ├── engine/                MATCHING AND SAFETY, no DOM
│   │   ├── text.js            Normalising, spellings, phrase synonyms, stemming, edit distance
│   │   ├── safety.js          Rule-based safety classifier
│   │   ├── retrieval.js       Weighted IDF scoring over topics and FAQs
│   │   └── responder.js       Decision order, confidence, response objects, copy text
│   └── ui/                    INTERFACE
│       ├── icons.js           Small line-icon set
│       ├── render.js          Response object to DOM (text only, safe **bold** parsing)
│       └── app.js             Views, conversation flow, library, glossary, checklist
├── scripts/build.js           Builds dist/ single-file versions
├── dist/
│   ├── cancer-support-chatbot.html   Standalone single file
│   └── artifact.html                 Same app without html/head/body wrapper (for embedding hosts)
└── tests/
    ├── load.js                Loads the plain scripts into Node
    ├── engine.test.js         Engine and content tests
    ├── ui_smoke.py            Browser tests
    └── screenshots/           Written by ui_smoke.py
```

### Technology choice

Plain HTML, CSS and JavaScript (ES5-style scripts, no framework, no build step to run). React with TypeScript was considered, but it would add a toolchain and a compile step without improving what this prototype needs to show. This way the app opens by double-clicking a file, the same code runs in Node for testing, and a reviewer can read every line. Content, retrieval, safety and UI are still separate modules.

---

## How it works

### 1. Knowledge base

Each topic is a plain object:

```js
{
  id: "biopsy",
  category: "diagnosis",
  title: "Biopsy: what it is and why it is needed",
  summary: "One line for the library.",
  patterns: ["what does biopsy mean", "why does my child need a biopsy", ...], // ways people ask
  keywords: ["biopsy", "sample", "tissue", ...],                              // central terms
  short: ["Essential explanation, always shown."],
  more: [{ h: "Heading", p: ["Paragraph"], list: ["Item"] }],                 // folded under "Read more"
  faqs: [{ id, q, patterns, keywords, a: ["Short answer"] }],                // optional
  askTeam: ["Questions you can ask your care team"],
  followUps: ["Suggested next questions"],
  related: ["pathology-report"],
  sources: ["nci-diagnosis"],                                                 // ids in sources.js
  flags: { urgentBanner: true }                                               // optional
}
```

Answers show the essentials first and fold details away, so a stressed reader is not handed everything at once.

### 2. Decision order for every message

1. **Normalise:** lower-case, expand contractions, fix known misspellings (`biospy`, `leukaemia`, `chemotheraphy`), and map everyday phrases to knowledge-base terms (`hair fall` to hair loss, `throwing up` to vomiting, `blood cancer` to leukemia, `spinal tap` to lumbar puncture).
2. **Safety check** (`safety.js`) before anything else. See below.
3. **Intents:** greetings, thanks, "who are you", privacy questions, "tell me more", "open the glossary".
4. **Definitions:** "what does X mean" checks the glossary. If the best topic is the same subject, the topic is shown with an "In short" definition on top.
5. **Retrieval** (`retrieval.js`): every topic and FAQ is scored.

| Signal | Weight |
|---|---|
| Keyword match | 2.5 x IDF |
| Title word | 1.5 x IDF |
| Question-variant word | 1.0 x IDF |
| Summary word | 0.5 x IDF |
| Best cosine similarity with a curated question variant | x 4 |
| Multi-word keyword found intact | +1.5 |
| Fuzzy correction (edit distance 1, or 2 for long words) | x 0.7 |
| Follow-up: previous topic's terms | x 0.5, plus +1.0 for the previous topic |

6. **Confidence:** below a score of 3.2, or with no match on a keyword or title word, the reply is an honest "I'm not sure" with nearby topics. If a second topic scores within 90% of the first (and the first is not already strong), the assistant asks which one was meant. Clearly unrelated subjects (weather, cricket, recipes) go straight to the fallback.

There is **no language model, machine learning or embedding model** in this project. The behaviour is deterministic and fully testable.

### 3. Safety rules (in the engine, not only in a disclaimer)

| Tier | Trigger example | Response |
|---|---|---|
| Crisis | "I want to die", "my son says he wants to die" | Support message with 112 and Tele-MANAS (14416). Nothing else. |
| Emergency | "She is not breathing", seizure, unconscious, swallowed tablets | First line: call emergency services (112 in India). Then the team. |
| Urgent | Fever, bleeding, can't keep fluids down, central line problems, drowsiness, breathing trouble, "should I take her to hospital?" | First line: call the treating team now. Cannot assess the child. Emergency route. No long explanation underneath. |
| Boundary | Diagnosis, interpreting results, prognosis or survival odds, start/stop/delay/change treatment, doses | Explains the limit, gives general context, defines any recognised terms without interpreting them, and offers questions for the team. |
| Banner | Symptom words in a general question ("why is fever dangerous during chemo?"), past symptoms, mild symptoms (vomiting, rash) | Normal answer with a short urgent-help note on top. |
| Privacy | Phone numbers, emails, hospital ID numbers, a child's name | A gentle note that these are not needed. |

Content rules enforced by tests: no medicine doses, no universal fever thresholds (the team decides what counts as a fever for each child), no claims of validation or partnership. Urgent replies never suggest that the absence of listed symptoms means a child is safe.

### 4. Privacy

No login, analytics or tracking. Nothing is sent to a server. The conversation lives only in memory and is gone on New conversation or page close. The appointment checklist can be kept in the browser's local storage only if the user ticks "Keep this checklist on this device"; unticking deletes it. The app does not claim to meet any healthcare privacy framework.

---

## Content and sources

All content is written in plain language, in our own words, as general education. Every URL in `src/data/sources.js` was opened and checked on 11 October 2026:

- National Cancer Institute (cancer.gov): childhood cancers, diagnosis, pathology reports, staging, each treatment type, side effects, infection and neutropenia, hair loss, nausea, fatigue, mouth problems, nutrition, late effects, support for families, emotions, the cancer terms dictionary, childhood ALL, Wilms tumor, neuroblastoma
- American Cancer Society (cancer.org): childhood cancer
- St. Jude Children's Research Hospital: Together by St. Jude
- World Health Organization: childhood cancer fact sheet
- Tata Memorial Centre: tmc.gov.in (the brief mentioned tmec.gov.in; the verified official site is tmc.gov.in)

Helplines used: 112 (India's single emergency number) and Tele-MANAS 14416 (India's national mental health helpline). Users outside India are pointed to their local emergency number.

None of these organisations endorse this project.

---

## Extending the knowledge base

1. **Add a topic.** Open the `topics-*.js` file for its category (or create a new one and add it to `src/manifest.json` and `index.html`). Copy an existing topic and change every field. Give it at least 3 `patterns` (real ways people ask) and 3 `keywords`.
2. **Add an FAQ** for a specific sub-question ("Does it hurt?") inside the topic's `faqs` array. FAQs need their own `keywords` so they only win when the question is about them.
3. **Add a glossary term** in `glossary.js` with `aliases` people might type and an optional `topic` link.
4. **Add a source** in `sources.js` after opening and checking the page. Set `verified: false` if you could not check it; the interface will label it and the test suite will flag it.
5. **Add a spelling or everyday phrase** in `text.js` (`SPELLING` or `PHRASES`) if people use a word the library doesn't.
6. **Run the tests:** `node tests/engine.test.js`. The integrity tests catch broken links between topics, missing sources, follow-ups that don't lead anywhere, and topics that don't answer their own question variants.
7. **Rebuild the single file:** `node scripts/build.js`.

To change how cautious matching is, edit `CONFIG` at the top of `src/engine/responder.js` (`minScore`, `clarifyRatio`, `clarifyCeiling`).

To add a personal credit to the About page, edit the paragraph with `id="creditLine"` in `index.html`.

---

## Accessibility

Semantic landmarks and headings, a skip link, visible focus rings, labelled controls, `role="log"` with polite live updates for new answers, keyboard operation throughout (Enter to send, Shift+Enter for a new line, Escape closes the mobile menu), a rounded, friendly type pairing (Fredoka headings, Nunito body text) chosen to feel welcoming to children while staying easy to read, text contrast above WCAG AA in both themes, `prefers-reduced-motion` respected, and 16px inputs on phones to avoid zooming.

---

## Known limitations

- **Rule-based understanding.** Matching is keyword and pattern based. Unusual phrasing, long multi-part messages or sarcasm can be misread. Low-confidence matches fall back honestly rather than guessing, and the match inspector (How it works page) shows exactly how a question was scored.
- **Safety rules can miss things or over-trigger.** They are deliberately cautious (for example, "fever" on its own gets the urgent reply), but no rule set catches every way of describing an emergency. The interface always points to the treating team.
- **English only.** Many families at Indian hospitals would prefer Hindi, Marathi or other languages. The content structure supports translation, but none is included.
- **Not clinically reviewed.** Content was written carefully from reputable public sources but has not been reviewed by pediatric oncologists for this prototype. That review would be the essential next step before any real use.
- **General content.** Practices differ between hospitals (food rules, fever plans, line care). Answers tell families to follow their own team's instructions.
- **No persistence of conversations** by design. Families who want to keep an answer can copy it.
- **Sources age.** Links were checked on 11 October 2026 and should be rechecked periodically.
