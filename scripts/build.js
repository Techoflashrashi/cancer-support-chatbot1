/*
 * Builds single-file versions of the app (no dependencies):
 *   dist/cancer-support-chatbot.html   standalone page; open it directly in a browser
 *   dist/artifact.html                 same content without the html/head/body wrapper,
 *                                      for hosts that supply their own document skeleton
 * Run: node scripts/build.js
 */
"use strict";
var fs = require("fs");
var path = require("path");
var ROOT = path.join(__dirname, "..");
var read = function (p) { return fs.readFileSync(path.join(ROOT, p), "utf8"); };

var html = read("index.html");
var css = read("styles/app.css");
var jsFiles = require("../src/manifest.json").concat(["src/ui/icons.js", "src/ui/render.js", "src/ui/app.js"]);
var js = jsFiles.map(function (f) { return "/* ---- " + f + " ---- */\n" + read(f).replace(/<\/script/gi, "<\\/script"); }).join("\n");

function between(src, tag) {
  var a = src.indexOf("<!-- BUILD:" + tag + " -->"), b = src.indexOf("<!-- /BUILD:" + tag + " -->");
  if (a < 0 || b < 0) throw new Error("missing BUILD:" + tag + " markers");
  return { start: a, end: b + ("<!-- /BUILD:" + tag + " -->").length, inner: src.slice(a + ("<!-- BUILD:" + tag + " -->").length, b) };
}

var cssBlock = "<style>\n" + css + "\n</style>";
var jsBlock = "<script>\n" + js + "\n</script>";

var standalone = html;
var c = between(standalone, "CSS"); standalone = standalone.slice(0, c.start) + cssBlock + standalone.slice(c.end);
var j = between(standalone, "JS"); standalone = standalone.slice(0, j.start) + jsBlock + standalone.slice(j.end);

var body = between(html, "BODY").inner;
var fontLink = (/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]+>/.exec(html) || [""])[0];
var artifact = [
  "<title>Cancer Support Chatbot</title>",
  fontLink,
  cssBlock,
  body.trim(),
  jsBlock
].join("\n");

fs.mkdirSync(path.join(ROOT, "dist"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "dist/cancer-support-chatbot.html"), standalone);
fs.writeFileSync(path.join(ROOT, "dist/artifact.html"), artifact);
console.log("Built dist/cancer-support-chatbot.html (" + Math.round(standalone.length / 1024) + " KB) and dist/artifact.html");
