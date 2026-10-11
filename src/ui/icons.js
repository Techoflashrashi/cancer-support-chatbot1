/* A small, consistent set of line icons (24px grid, 1.8 stroke). */
(function (root) {
  "use strict";
  var CSC = (root.CSC = root.CSC || {});
  var P = {
    chat: '<path d="M4 5.5h16v10H9.5L5 19v-3.5H4z"/>',
    book: '<path d="M4 4.5h6.5A2.5 2.5 0 0 1 13 7v12.5a2 2 0 0 0-2-2H4z"/><path d="M20 4.5h-4.5A2.5 2.5 0 0 0 13 7v12.5a2 2 0 0 1 2-2h5z"/>',
    az: '<path d="M4 17l3.5-10L11 17"/><path d="M5.2 13.5h4.6"/><path d="M14 7h6l-6 10h6"/>',
    check: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.2l2.4 2.4 4.8-5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    cog: '<path d="M8 6l-4 6 4 6"/><path d="M16 6l4 6-4 6"/><path d="M13.5 5l-3 14"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    send: '<path d="M5 12l14-7-5 14-2.5-5.5z"/><path d="M11.5 13.5L19 5"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4.5"/><path d="M12 17.5h.01"/>',
    shield: '<path d="M12 3.5l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9v-5z"/><path d="M9.5 12l2 2 3.5-4"/>',
    lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    ext: '<path d="M14 4.5h5.5V10"/><path d="M19.5 4.5L11 13"/><path d="M18 14v4.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1H10"/>',
    list: '<path d="M9 7h11M9 12h11M9 17h11"/><path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    heart: '<path d="M12 19s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.5C19 14.6 12 19 12 19z"/>',
    question: '<circle cx="12" cy="12" r="8.5"/><path d="M9.7 9.5a2.4 2.4 0 1 1 3.4 2.2c-.7.3-1.1.9-1.1 1.6v.4"/><path d="M12 16.8h.01"/>'
  };
  CSC.icon = function (name, cls) {
    var span = document.createElement("span");
    span.innerHTML = '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (P[name] || "") + "</svg>";
    return span.firstChild;
  };
  CSC.hydrateIcons = function (scope) {
    var nodes = (scope || document).querySelectorAll("[data-icon]");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.parentNode.replaceChild(CSC.icon(n.getAttribute("data-icon")), n);
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
