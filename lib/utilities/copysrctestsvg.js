"use strict";

const PLI = require("@superflycss/pli");
const rsync = require("recursive-copy");
const log = require("node-pretty-log");
const fs = require('fs');

/**
 * Copy the `src/test/svg` content to the `to` destination directory.
 * @param to The destination directory
 * @return Promise indicating copy result.
 */
module.exports = (to) => {
  if (fs.existsSync(PLI.src.test.svg)) {
    log('info', `Copying src/test/svg/**/*.svg to ${to}`);
    return rsync(PLI.src.test.svg, to);
  }
}