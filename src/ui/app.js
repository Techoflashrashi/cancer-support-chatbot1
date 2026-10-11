/*
 * Application controller: views, conversation flow, library, glossary,
 * checklist and settings. The conversation lives only in memory.
 */
(function () {
  "use strict";
  var CSC = window.CSC;
  var E = CSC.engine, R = CSC.render, el = R.el;

  var $ = function (id) { return document.getElementById(id); };
  var STORAGE_KEY = "csc-checklist-v1";

  var app = {
    engineState: E.newState(),
    busy: false,
    debug: false,
    checklist: { selected: [], custom: [] },
    persist: false
  };

  var VIEWS = { chat: "Conversation", library: "Topic library", glossary: "Glossary", checklist: "Appointment checklist", about: "About", how: "How it works" };

  var WELCOME_QUESTIONS = [
    "What does biopsy mean?",
    "What happens during chemotherapy?",
    "Will my child lose their hair?",
    "What should I ask the doctor tomorrow?",
    "What does remission mean?",
    "How can I explain cancer to my younger child?"
  ];
  var WELCOME_CATEGORIES = ["understanding", "treatment", "side-effects", "family"];

  /* ---------------- Storage (checklist only, opt-in) ---------------- */
  function loadChecklist() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (data && Array.isArray(data.selected) && Array.isArray(data.custom)) {
        app.checklist = { selected: data.selected.slice(0, 200), custom: data.custom.slice(0, 100) };
        app.persist = true;
      }
    } catch (e) { /* storage unavailable: work in memory */ }
  }
  function saveChecklist() {
    if (!app.persist) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(app.checklist)); } catch (e) { /* ignore */ }
  }
  function forgetChecklist() {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  /* ---------------- Toast and copy ---------------- */
  var toastTimer = null;
  function toast(msg) {
    var host = $("toastHost");
    host.textContent = "";
    var t = el("div", { class: "toast", role: "status", text: msg });
    host.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { host.textContent = ""; }, 2600);
  }

  function copyText(text, onDone) {
    var fallback = function () {
      var ta = el("textarea", { class: "copy-fallback", readonly: true, "aria-label": "Text to copy" });
      ta.value = text;
      document.body.appendChild(ta);
      ta.style.position = "fixed"; ta.style.opacity = "0"; ta.style.top = "0";
      ta.select();
      var okCopy = false;
      try { okCopy = document.execCommand("copy"); } catch (e) { okCopy = false; }
      document.body.removeChild(ta);
      if (okCopy) { toast("Copied"); if (onDone) onDone(); }
      else showCopyPanel(text);
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { toast("Copied"); if (onDone) onDone(); }, fallback);
      } else fallback();
    } catch (e) { fallback(); }
  }

  function showCopyPanel(text) {
    var host = $("toastHost");
    host.textContent = "";
    var ta = el("textarea", { class: "copy-fallback", readonly: true, "aria-label": "Text to copy" });
    ta.value = text;
    var panel = el("div", { class: "toast", role: "dialog", "aria-label": "Copy text", style: "width:min(560px,calc(100% - 32px));display:flex;flex-direction:column;gap:8px" }, [
      el("span", { text: "Copying isn't available here. The text is selected below: copy it with your keyboard or long-press." }),
      ta,
      el("button", { class: "text-btn", type: "button", onclick: function () { host.textContent = ""; } }, ["Close"])
    ]);
    clearTimeout(toastTimer);
    host.appendChild(panel);
    ta.focus(); ta.select();
  }

  /* ---------------- Navigation ---------------- */
  function setView(name, opts) {
    if (!VIEWS[name]) name = "chat";
    Object.keys(VIEWS).forEach(function (v) { $("view-" + v).hidden = v !== name; });
    document.querySelectorAll(".nav-item").forEach(function (b) {
      if (b.getAttribute("data-view") === name) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    $("viewTitle").textContent = VIEWS[name];
    $("newChatBtn").hidden = name !== "chat";
    if (location.hash !== "#" + name) {
      try { history.replaceState(null, "", "#" + name); } catch (e) { /* sandboxed */ }
    }
    closeDrawer();
    if (name === "checklist") renderChecklist();
    if (!(opts && opts.silent)) {
      if (name === "chat") $("input").focus();
      else $("viewTitle").focus();
    }
    app.view = name;
  }

  function openDrawer() { $("app").classList.add("drawer-open"); $("menuBtn").setAttribute("aria-expanded", "true"); var f = document.querySelector(".nav-item"); if (f) f.focus(); }
  function closeDrawer() { $("app").classList.remove("drawer-open"); $("menuBtn").setAttribute("aria-expanded", "false"); }

  /* ---------------- Conversation ---------------- */
  var handlers = {
    ask: function (q) { setView("chat", { silent: true }); send(q); },
    openTopic: function (topicId, docId, label) { setView("chat", { silent: true }); sendTopic(topicId, docId, label); },
    openCategory: function (catId) { setView("library"); var t = $("cat-" + catId); if (t) t.scrollIntoView({ block: "start" }); },
    copy: function (r, btn) { copyText(E.toPlainText(r)); },
    addQuestions: function (list) { var n = 0; list.forEach(function (q) { if (addCustom(q, true)) n++; }); renderChecklistCount(); saveChecklist(); if (n) toast(n + " question" + (n > 1 ? "s" : "") + " added to your checklist"); return n; },
    hasQuestion: function (q) { return isSelected(q); },
    navigate: function (v) { setView(v); }
  };

  function logInner() { return $("logInner"); }

  function scrollToEnd(node) {
    var log = $("log");
    if (node) {
      // Bring the start of the new answer into view, so long answers are read from the top.
      var delta = node.getBoundingClientRect().top - log.getBoundingClientRect().top - 12;
      log.scrollTop = Math.max(0, log.scrollTop + delta);
    } else log.scrollTop = log.scrollHeight;
  }

  function addUser(text) {
    var m = el("div", { class: "msg user" }, [el("span", { class: "who", text: "You" }), el("div", { class: "bubble-user", text: text })]);
    logInner().appendChild(m);
    return m;
  }

  function addAssistant(node) {
    var m = el("div", { class: "msg bot" }, [el("span", { class: "who", text: "Assistant" }), node]);
    logInner().appendChild(m);
    return m;
  }

  function showThinking() {
    var t = el("div", { class: "msg bot", id: "thinking" }, [el("div", { class: "thinking" }, [el("span", { class: "dots", "aria-hidden": "true" }, [el("i"), el("i"), el("i")]), "Looking through the library"])]);
    logInner().appendChild(t);
    scrollToEnd();
    return t;
  }

  function errorCard() {
    return R.response({ kind: "error", title: "Sorry, I couldn't answer that", blocks: [{ p: ["Something went wrong while finding an answer. Your conversation is still here. Please try asking again, perhaps in different words."] }], notices: [], followUps: ["What can you help with?"], askTeam: [], terms: [], sources: [], choices: [] }, handlers);
  }

  function deliver(produce, userText) {
    if (app.busy) return;
    app.busy = true;
    $("sendBtn").disabled = true;
    if (userText) addUser(userText);
    var thinking = showThinking();
    var delay = 380 + Math.floor(Math.random() * 260);
    setTimeout(function () {
      var card, resp = null;
      try {
        resp = produce();
        card = R.response(resp, { ask: handlers.ask, openTopic: handlers.openTopic, openCategory: handlers.openCategory, copy: handlers.copy, addQuestions: handlers.addQuestions, hasQuestion: handlers.hasQuestion, navigate: handlers.navigate, debug: app.debug });
      } catch (e) {
        if (window.console) console.error(e);
        card = errorCard();
      }
      if (thinking.parentNode) thinking.parentNode.removeChild(thinking);
      var m = addAssistant(card);
      scrollToEnd(m);
      app.busy = false;
      $("sendBtn").disabled = false;
      if (resp && resp.kind === "navigate" && resp.action) setTimeout(function () { setView(resp.action.view); }, 650);
    }, delay);
  }

  function send(text) {
    var q = String(text || "").trim();
    if (!q) { toast("Type a question first"); $("input").focus(); return; }
    if (app.busy) return;
    deliver(function () { return E.respond(q, app.engineState); }, q);
  }

  function sendTopic(topicId, docId, label) {
    if (app.busy) return;
    var t = CSC.getTopic(topicId);
    var lab = label ? label.replace(/^Read the full guide: |^Learn more: /, "") : (t ? t.title : "this topic");
    deliver(function () { return E.respondToTopic(topicId, app.engineState, docId); }, "Show me: " + lab);
  }

  function welcomeCard() {
    var card = el("article", { class: "card welcome", "aria-label": "Welcome" });
    card.appendChild(el("div", { class: "eyebrow" }, [el("span", { class: "dot", "aria-hidden": "true" }), "Welcome"]));
    card.appendChild(el("h3", { text: "Ask anything you're trying to understand about your child's cancer care." }));
    card.appendChild(R.blocks([{ p: [
      "I explain medical words, tests, treatments, side effects and practical things like appointments, prescriptions and talking to children, in plain language. Older children and teenagers can ask too.",
      "I answer from a curated library of general information with sources. I can't give advice about your child, so I'll point you to your care team for anything personal."
    ] }]));
    card.appendChild(el("div", { class: "notice urgent", role: "note" }, [CSC.icon("alert"), el("div", { text: "If your child is unwell right now, contact their treating team. In an emergency, call 112 in India or your local emergency number." })]));
    card.appendChild(el("div", { class: "section-label", text: "Try asking" }));
    var grid = el("div", { class: "welcome-grid" });
    WELCOME_QUESTIONS.forEach(function (q) { grid.appendChild(el("button", { class: "chip suggest", type: "button", onclick: function () { send(q); } }, [q])); });
    card.appendChild(grid);
    var browse = el("div", { class: "browse" }, [el("span", { class: "section-label", text: "Or browse:" })]);
    WELCOME_CATEGORIES.forEach(function (id) {
      var c = CSC.getCategory(id);
      browse.appendChild(el("button", { class: "chip", type: "button", onclick: function () { handlers.openCategory(id); } }, [c.title]));
    });
    browse.appendChild(el("button", { class: "chip", type: "button", onclick: function () { setView("library"); } }, ["All topics"]));
    card.appendChild(browse);
    return card;
  }

  function newConversation(announce) {
    app.engineState = E.newState();
    app.busy = false;
    $("sendBtn").disabled = false;
    logInner().textContent = "";
    addAssistant(welcomeCard());
    $("log").scrollTop = 0;
    $("input").value = "";
    autosize();
    if (announce) { toast("Conversation cleared"); $("input").focus(); }
  }

  function autosize() {
    var ta = $("input");
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }

  /* ---------------- Library ---------------- */
  function renderLibrary(filter) {
    var host = $("libList");
    host.textContent = "";
    var f = CSC.text.normalize(filter || "");
    var ftoks = f ? f.split(" ") : [];
    var shown = 0;
    CSC.categories.forEach(function (c) {
      var topics = CSC.topics.filter(function (t) {
        if (t.category !== c.id) return false;
        if (!ftoks.length) return true;
        var hay = CSC.text.normalize([t.title, t.summary, (t.keywords || []).join(" "), c.title].join(" "));
        return ftoks.every(function (w) { return hay.indexOf(w) !== -1; });
      });
      if (!topics.length) return;
      shown += topics.length;
      var sec = el("section", { class: "cat", id: "cat-" + c.id, "aria-labelledby": "cath-" + c.id }, [
        el("div", { class: "cat-head" }, [el("h3", { id: "cath-" + c.id, text: c.title }), el("p", { text: c.blurb })])
      ]);
      var ul = el("ul", { class: "topic-list" });
      topics.forEach(function (t) {
        ul.appendChild(el("li", null, [el("button", { class: "topic-btn", type: "button", onclick: function () { handlers.openTopic(t.id); } }, [
          el("span", { class: "t", text: t.title }), el("span", { class: "s", text: t.summary }), CSC.icon("arrow")
        ])]));
      });
      sec.appendChild(ul);
      host.appendChild(sec);
    });
    if (!ftoks.length || "glossary words terms dictionary".indexOf(f) !== -1) {
      host.appendChild(el("section", { class: "cat" }, [
        el("div", { class: "cat-head" }, [el("h3", { text: "Plain-language glossary" }), el("p", { text: CSC.glossary.length + " medical words explained simply." })]),
        el("ul", { class: "topic-list" }, [el("li", null, [el("button", { class: "topic-btn", type: "button", onclick: function () { setView("glossary"); } }, [el("span", { class: "t", text: "Open the glossary" }), el("span", { class: "s", text: "Look up words like ANC, lumbar puncture or remission." }), CSC.icon("arrow")])])])
      ]));
    }
    if (!shown && ftoks.length) {
      host.appendChild(el("div", { class: "empty" }, [
        el("p", { text: "No topics match “" + filter + "”." }),
        el("p", { text: "Try a shorter word, or ask your question in the conversation." }),
        el("button", { class: "text-btn primary", type: "button", onclick: function () { handlers.ask(filter); } }, ["Ask “" + filter + "” in the conversation"])
      ]));
    }
  }

  function renderCatJump() {
    var host = $("catJump");
    CSC.categories.forEach(function (c) {
      host.appendChild(el("button", { class: "chip", type: "button", onclick: function () { $("libSearch").value = ""; renderLibrary(""); var t = $("cat-" + c.id); if (t) t.scrollIntoView({ block: "start" }); } }, [c.title]));
    });
  }

  /* ---------------- Glossary ---------------- */
  function sortedGlossary() { return CSC.glossary.slice().sort(function (a, b) { return a.term.localeCompare(b.term); }); }

  function renderGlossary(filter) {
    var host = $("glossList");
    host.textContent = "";
    var f = (filter || "").trim().toLowerCase();
    var items = sortedGlossary().filter(function (g) {
      if (!f) return true;
      return (g.term + " " + (g.aliases || []).join(" ") + " " + g.definition).toLowerCase().indexOf(f) !== -1;
    });
    var letters = {};
    items.forEach(function (g) { var L = g.term.charAt(0).toUpperCase(); (letters[L] = letters[L] || []).push(g); });
    var az = $("az");
    az.textContent = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (L) {
      if (letters[L]) {
        az.appendChild(el("a", { href: "#gl-" + L, text: L, onclick: function (ev) { ev.preventDefault(); var t = $("gl-" + L); if (t) t.scrollIntoView({ block: "start" }); } }));
      } else az.appendChild(el("span", { text: L, "aria-hidden": "true" }));
    });
    Object.keys(letters).sort().forEach(function (L) {
      var sec = el("section", { "aria-labelledby": "gl-" + L });
      sec.appendChild(el("h3", { class: "gloss-letter", id: "gl-" + L, text: L }));
      var dl = el("dl", { class: "gloss" });
      letters[L].forEach(function (g) {
        var t = g.topic && CSC.getTopic(g.topic);
        dl.appendChild(el("div", { class: "gloss-item" }, [
          el("dt", { text: g.term }),
          el("dd", { text: g.definition }),
          t ? el("button", { class: "text-btn", type: "button", onclick: function () { handlers.openTopic(t.id, null, t.title); } }, [CSC.icon("arrow"), "Read: " + t.title]) : null
        ]));
      });
      sec.appendChild(dl);
      host.appendChild(sec);
    });
    if (!items.length) {
      host.appendChild(el("div", { class: "empty" }, [
        el("p", { text: "No words match “" + filter + "”." }),
        el("p", { text: "Check the spelling, try part of the word, or ask in the conversation." }),
        el("button", { class: "text-btn primary", type: "button", onclick: function () { handlers.ask("What does " + filter + " mean?"); } }, ["Ask what “" + filter + "” means"])
      ]));
    }
  }

  /* ---------------- Checklist ---------------- */
  function isSelected(q) { return app.checklist.selected.indexOf(q) !== -1; }
  function toggleSelected(q, on) {
    var i = app.checklist.selected.indexOf(q);
    if (on && i === -1) app.checklist.selected.push(q);
    if (!on && i !== -1) app.checklist.selected.splice(i, 1);
  }
  function bankHas(q) {
    return CSC.checklistGroups.some(function (g) { return g.questions.indexOf(q) !== -1; });
  }
  /* Adds a question as ticked. Returns true if it was newly added. */
  function addCustom(q, fromAnswer) {
    q = String(q).trim().slice(0, 240);
    if (!q) return false;
    var already = isSelected(q);
    if (!bankHas(q) && app.checklist.custom.indexOf(q) === -1) app.checklist.custom.push(q);
    toggleSelected(q, true);
    return !already;
  }

  function renderChecklistCount() {
    var n = app.checklist.selected.length;
    var c = $("checkCount");
    c.hidden = n === 0;
    c.textContent = n;
    $("checkSummary").textContent = n === 0 ? "No questions chosen yet" : n + " question" + (n > 1 ? "s" : "") + " chosen";
  }

  function checkItem(q, removable) {
    var id = "q-" + Math.abs(hashStr(q));
    var cb = el("input", { type: "checkbox", id: id });
    cb.checked = isSelected(q);
    cb.addEventListener("change", function () { toggleSelected(q, cb.checked); renderChecklistCount(); saveChecklist(); });
    var row = el("div", { class: "check-item" }, [cb, el("label", { for: id, text: q })]);
    if (removable) {
      row.appendChild(el("button", { class: "remove", type: "button", "aria-label": "Remove question: " + q, onclick: function () {
        app.checklist.custom.splice(app.checklist.custom.indexOf(q), 1);
        toggleSelected(q, false);
        saveChecklist(); renderChecklist();
      } }, [CSC.icon("x")]));
    }
    return row;
  }

  function hashStr(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }

  function renderChecklist() {
    var host = $("checkGroups");
    host.textContent = "";
    if (app.checklist.custom.length) {
      var g0 = el("div", { class: "check-group" }, [el("h3", { text: "Your questions" })]);
      app.checklist.custom.forEach(function (q) { g0.appendChild(checkItem(q, true)); });
      host.appendChild(g0);
    }
    CSC.checklistGroups.forEach(function (g) {
      var sec = el("div", { class: "check-group", role: "group", "aria-label": g.title }, [el("h3", { text: g.title })]);
      g.questions.forEach(function (q) { sec.appendChild(checkItem(q, false)); });
      host.appendChild(sec);
    });
    renderChecklistCount();
    $("persistToggle").checked = app.persist;
  }

  function checklistText() {
    var sel = app.checklist.selected;
    var ordered = app.checklist.custom.filter(function (q) { return sel.indexOf(q) !== -1; });
    CSC.checklistGroups.forEach(function (g) { g.questions.forEach(function (q) { if (sel.indexOf(q) !== -1 && ordered.indexOf(q) === -1) ordered.push(q); }); });
    sel.forEach(function (q) { if (ordered.indexOf(q) === -1) ordered.push(q); });
    return "Questions for my child's care team\n\n" + ordered.map(function (q, i) { return (i + 1) + ". " + q; }).join("\n") + "\n\nNotes:\n";
  }

  /* ---------------- How it works ---------------- */
  function renderStats() {
    var faqs = 0;
    CSC.topics.forEach(function (t) { faqs += (t.faqs || []).length; });
    var stats = [[CSC.topics.length, "topics"], [faqs, "short FAQs"], [CSC.glossary.length, "glossary terms"], [Object.keys(CSC.sources).length, "checked sources"]];
    var host = $("stats");
    stats.forEach(function (s) { host.appendChild(el("div", { class: "stat" }, [el("b", { text: String(s[0]) }), el("span", { text: s[1] })])); });
    $("cfgMin").textContent = E.CONFIG.minScore;
    $("cfgRatio").textContent = Math.round(E.CONFIG.clarifyRatio * 100) + "%";
    $("checkedOn").textContent = CSC.SOURCES_CHECKED_ON;
  }

  /* ---------------- Wire up ---------------- */
  function init() {
    CSC.hydrateIcons(document);
    loadChecklist();

    document.querySelectorAll(".nav-item").forEach(function (b) {
      b.addEventListener("click", function () { setView(b.getAttribute("data-view")); });
    });
    $("menuBtn").addEventListener("click", function () { if ($("app").classList.contains("drawer-open")) closeDrawer(); else openDrawer(); });
    $("scrim").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && $("app").classList.contains("drawer-open")) { closeDrawer(); $("menuBtn").focus(); } });
    $("newChatBtn").addEventListener("click", function () { newConversation(true); });
    $("urgentLink").addEventListener("click", function () { handlers.openTopic("when-to-call"); });

    $("composer").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = $("input").value;
      if (!v.trim()) { toast("Type a question first"); return; }
      if (app.busy) return;
      $("input").value = ""; autosize();
      send(v);
    });
    $("input").addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); $("composer").requestSubmit ? $("composer").requestSubmit() : $("composer").dispatchEvent(new Event("submit", { cancelable: true })); }
    });
    $("input").addEventListener("input", autosize);

    $("libSearch").addEventListener("input", function () { renderLibrary($("libSearch").value); });
    $("glossSearch").addEventListener("input", function () { renderGlossary($("glossSearch").value); });

    $("copyChecklist").addEventListener("click", function () {
      if (!app.checklist.selected.length) { toast("Tick at least one question first"); return; }
      copyText(checklistText());
    });
    $("clearChecklist").addEventListener("click", function () {
      app.checklist.selected = [];
      saveChecklist(); renderChecklist(); toast("Ticks cleared");
    });
    $("addQuestionForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = $("ownQuestion").value.trim();
      if (!v) { toast("Type a question to add"); $("ownQuestion").focus(); return; }
      addCustom(v); $("ownQuestion").value = "";
      saveChecklist(); renderChecklist(); toast("Question added");
    });
    $("persistToggle").addEventListener("change", function () {
      app.persist = $("persistToggle").checked;
      if (app.persist) { saveChecklist(); toast("Checklist will be kept on this device"); }
      else { forgetChecklist(); toast("Saved checklist deleted from this device"); }
    });
    $("debugToggle").addEventListener("change", function () {
      app.debug = $("debugToggle").checked;
      toast(app.debug ? "Match details will show under new answers" : "Match details hidden");
    });

    window.addEventListener("hashchange", function () { var v = location.hash.replace("#", ""); if (VIEWS[v] && v !== app.view) setView(v); });

    renderLibrary("");
    renderCatJump();
    renderGlossary("");
    renderChecklist();
    renderStats();
    newConversation(false);
    var start = location.hash.replace("#", "");
    setView(VIEWS[start] ? start : "chat", { silent: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
