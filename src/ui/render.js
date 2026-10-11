/*
 * DOM rendering for response objects. All text is inserted with textContent;
 * the only markup supported in content is **bold**, parsed here safely.
 */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (attrs[k] == null || attrs[k] === false) continue;
        if (k === "class") n.className = attrs[k];
        else if (k === "text") n.textContent = attrs[k];
        else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
        else n.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
      }
    }
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  function inline(text) {
    var frag = document.createDocumentFragment();
    String(text).split(/(\*\*[^*]+\*\*)/g).forEach(function (part) {
      if (!part) return;
      if (/^\*\*[^*]+\*\*$/.test(part)) frag.appendChild(el("strong", { text: part.slice(2, -2) }));
      else frag.appendChild(document.createTextNode(part));
    });
    return frag;
  }

  function blocks(list) {
    var wrap = el("div", { class: "prose" });
    (list || []).forEach(function (b) {
      if (b.h) wrap.appendChild(el("h4", null, [inline(b.h)]));
      (b.p || []).forEach(function (p) { wrap.appendChild(el("p", null, [inline(p)])); });
      if (b.list && b.list.length) {
        var ul = el("ul");
        b.list.forEach(function (li) { ul.appendChild(el("li", null, [inline(li)])); });
        wrap.appendChild(ul);
      }
    });
    return wrap;
  }

  var EYEBROW = {
    answer: "General information",
    faq: "General information",
    definition: "Glossary",
    urgent: "Safety",
    emergency: "Safety",
    crisis: "Support",
    boundary: "About your child's care",
    clarify: "Checking what you meant",
    fallback: "Not sure",
    meta: "Assistant",
    navigate: "Assistant",
    error: "Something went wrong"
  };

  function notice(n) {
    var icon = n.type === "urgent" ? "alert" : n.type === "privacy" ? "lock" : "info";
    return el("div", { class: "notice " + n.type, role: n.type === "urgent" ? "note" : null }, [CSC.icon(icon), el("div", null, [inline(n.text)])]);
  }

  /*
   * renderResponse(r, h)
   * h: { ask(text), openTopic(topicId, docId, label), openCategory(id), copy(r, btn),
   *      addQuestions(list) -> number added, hasQuestion(q), navigate(view), debug }
   */
  function renderResponse(r, h) {
    var card = el("article", { class: "card " + r.kind, "aria-label": r.title || EYEBROW[r.kind] });
    var eyebrowText = EYEBROW[r.kind] || "Assistant";
    if ((r.kind === "answer" || r.kind === "faq") && r.category) {
      var cat = CSC.getCategory(r.category);
      if (cat) eyebrowText += " · " + cat.title;
    }
    var eyebrowIcon = r.kind === "urgent" || r.kind === "emergency" ? CSC.icon("alert") : r.kind === "crisis" ? CSC.icon("heart") : el("span", { class: "dot", "aria-hidden": "true" });
    card.appendChild(el("div", { class: "eyebrow" }, [eyebrowIcon, eyebrowText]));
    if (r.title) card.appendChild(el("h3", { text: r.title }));

    (r.notices || []).forEach(function (n) { card.appendChild(notice(n)); });

    if (r.lead) {
      card.appendChild(el("div", { class: "lead" }, [el("span", { class: "label", text: "In short" }), el("p", null, [inline(r.lead.text)])]));
    }
    if (r.opener) card.appendChild(el("p", { class: "opener", text: r.opener }));
    if (r.blocks && r.blocks.length) card.appendChild(blocks(r.blocks));

    if (r.more && r.more.length) {
      var det = el("details", { class: "more" });
      if (r.expanded) det.open = true;
      det.appendChild(el("summary", null, [CSC.icon("chev", "chev"), "Read more about this"]));
      det.appendChild(blocks(r.more));
      card.appendChild(det);
    }

    if (r.choices && r.choices.length) {
      var cl = el("div", { class: "choice-list" });
      r.choices.forEach(function (c) {
        cl.appendChild(el("button", {
          class: "choice", type: "button",
          onclick: function () {
            if (c.categoryId) h.openCategory(c.categoryId);
            else h.openTopic(c.topicId, c.docId, c.label);
          }
        }, [el("span", { text: c.label }), CSC.icon("arrow")]));
      });
      card.appendChild(cl);
    }

    if (r.askTeam && r.askTeam.length) {
      var box = el("section", { class: "ask-team", "aria-label": "Questions you can ask your care team" });
      box.appendChild(el("h4", null, [CSC.icon("question"), "Questions you can ask your care team"]));
      var ul = el("ul");
      r.askTeam.forEach(function (q) { ul.appendChild(el("li", { text: q })); });
      box.appendChild(ul);
      var row = el("div", { class: "row" });
      var allIn = r.askTeam.every(h.hasQuestion);
      var addBtn = el("button", { class: "text-btn" + (allIn ? " done" : ""), type: "button", "aria-pressed": allIn ? "true" : "false" }, [CSC.icon(allIn ? "check" : "plus"), allIn ? "In your checklist" : "Add these to my checklist"]);
      var openBtn = el("button", { class: "text-btn", type: "button", hidden: !allIn, onclick: function () { h.navigate("checklist"); } }, [CSC.icon("list"), "Open checklist"]);
      addBtn.addEventListener("click", function () {
        if (addBtn.getAttribute("aria-pressed") === "true") return;
        var n = h.addQuestions(r.askTeam);
        addBtn.className = "text-btn done";
        addBtn.setAttribute("aria-pressed", "true");
        addBtn.textContent = "";
        addBtn.appendChild(CSC.icon("check"));
        addBtn.appendChild(document.createTextNode(n ? "Added to your checklist" : "Already in your checklist"));
        openBtn.hidden = false;
      });
      row.appendChild(addBtn);
      row.appendChild(openBtn);
      box.appendChild(row);
      card.appendChild(box);
    }

    if (r.terms && r.terms.length) {
      var terms = el("div", { class: "terms" });
      terms.appendChild(el("div", { class: "section-label", text: "Words in this answer" }));
      var chips = el("div", { class: "chips" });
      var defHost = el("div", { "aria-live": "polite" });
      r.terms.forEach(function (g, i) {
        var id = "def-" + Math.random().toString(36).slice(2, 8) + i;
        var chip = el("button", { class: "chip term", type: "button", "aria-expanded": "false", "aria-controls": id, text: g.term.replace(/\s*\(.*\)$/, "") });
        chip.addEventListener("click", function () {
          var open = chip.getAttribute("aria-expanded") === "true";
          chips.querySelectorAll(".chip.term").forEach(function (c) { c.setAttribute("aria-expanded", "false"); });
          defHost.textContent = "";
          if (!open) {
            chip.setAttribute("aria-expanded", "true");
            defHost.appendChild(el("div", { class: "term-def", id: id }, [el("strong", { text: g.term }), g.definition]));
          }
        });
        chips.appendChild(chip);
      });
      terms.appendChild(chips);
      terms.appendChild(defHost);
      card.appendChild(terms);
    }

    if (r.sources && r.sources.length) {
      var src = el("details", { class: "sources" });
      src.appendChild(el("summary", null, [CSC.icon("chev", "chev"), "Sources (" + r.sources.length + ")"]));
      var sl = el("ul");
      r.sources.forEach(function (id) {
        var s = CSC.sources[id];
        if (!s) return;
        sl.appendChild(el("li", null, [
          el("a", { href: s.url, target: "_blank", rel: "noopener noreferrer" }, [s.org + ": " + s.title]),
          s.verified ? null : " (link not yet verified)"
        ]));
      });
      src.appendChild(sl);
      src.appendChild(el("p", { class: "src-note", text: "Summarised in plain language from these public resources. Links checked " + CSC.SOURCES_CHECKED_ON + ". These organisations do not endorse this prototype." }));
      card.appendChild(src);
    }

    if (r.followUps && r.followUps.length) {
      var fu = el("div", { class: "terms" });
      fu.appendChild(el("div", { class: "section-label", text: "You could also ask" }));
      var fchips = el("div", { class: "chips" });
      r.followUps.forEach(function (q) {
        fchips.appendChild(el("button", { class: "chip suggest", type: "button", onclick: function () { h.ask(q); } }, [q]));
      });
      fu.appendChild(fchips);
      card.appendChild(fu);
    }

    var copyable = ["answer", "faq", "definition", "boundary", "urgent", "emergency", "crisis"].indexOf(r.kind) !== -1;
    var foot = el("div", { class: "card-foot" });
    foot.appendChild(el("span", { class: "general", text: r.kind === "answer" || r.kind === "faq" ? "General information, not advice for your child." : "" }));
    if (copyable) {
      var cb = el("button", { class: "text-btn", type: "button" }, [CSC.icon("copy"), "Copy"]);
      cb.addEventListener("click", function () { h.copy(r, cb); });
      foot.appendChild(cb);
    }
    if ((r.kind === "answer" || r.kind === "faq") && r.category) {
      foot.appendChild(el("button", { class: "text-btn", type: "button", onclick: function () { h.openCategory(r.category); } }, [CSC.icon("book"), "More in this category"]));
    }
    if (foot.childNodes.length > 1 || copyable) card.appendChild(foot);

    if (h.debug && r.debug) card.appendChild(el("pre", { class: "debug", "aria-label": "Match details", text: formatDebug(r) }));
    return card;
  }

  function formatDebug(r) {
    var d = r.debug || {}, lines = [];
    lines.push("response: " + r.kind + (r.boundary ? " (" + r.boundary + ")" : "") + (r.docId ? "  doc: " + r.docId : ""));
    if (d.safety) lines.push("safety: tier=" + d.safety.tier + (d.safety.rule ? " rule=" + d.safety.rule : "") + (d.safety.symptoms.length ? " symptoms=" + d.safety.symptoms.join(",") : "") + " report=" + d.safety.report + " educational=" + d.safety.educational + " pastOnly=" + d.safety.pastOnly);
    if (d.glossary) lines.push("glossary: " + d.glossary);
    if (d.retrieval) {
      lines.push("tokens: " + d.retrieval.tokens.join(" ") + (d.retrieval.followUp ? "  (follow-up: using previous topic)" : ""));
      if (d.retrieval.fuzzy.length) lines.push("fuzzy: " + d.retrieval.fuzzy.join(", "));
      lines.push("top: " + d.retrieval.candidates.map(function (c) { return c.id + " " + c.score; }).join("  |  "));
    }
    if (d.source) lines.push("source: " + d.source);
    return lines.join("\n");
  }

  CSC.render = { el: el, inline: inline, blocks: blocks, response: renderResponse };
})(typeof window !== "undefined" ? window : globalThis);
