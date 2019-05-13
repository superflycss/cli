"use strict";

const PLI = require("@superflycss/pli");
const rsync = require("recursive-copy");
const log = require("node-pretty-log");
const fs = require('fs');

/**
 * Copy the `src/test/svg` content to the `to` destination directory.
 * @param to The destination directory
 */
module.exports = (to) => {
  if (fs.existsSync(PLI.target.test.html)) {
    log('info', `Copying target/test/html/**/*.html to ${to}`);
    return rsync(PLI.target.test.html, to);
  }
}