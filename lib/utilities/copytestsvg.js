"use strict";

const PLI = require("@superflycss/pli");
const rsync = require("recursive-copy");
const fs = require('fs');

module.exports = function copyTestSVG(to) {
  if (fs.existsSync(PLI.src.test.svg)) {
    rsync(PLI.src.test.svg, to, function(error, results) {
      if (error) {
        console.error(`Copying svg to ${to} failed: ` + error);
      }
    });
  }
}