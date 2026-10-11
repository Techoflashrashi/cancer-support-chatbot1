/* Loads the app's plain-script modules into Node, in the same order as index.html. */
"use strict";
var path = require("path");
var FILES = require("../src/manifest.json");
module.exports = function load() {
  FILES.forEach(function (f) { require(path.join(__dirname, "..", f)); });
  return globalThis.CSC;
};
