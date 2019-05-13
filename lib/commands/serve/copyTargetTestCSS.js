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
  if (fs.existsSync(PLI.target.test.css)) {
    log('info', `Copying target/test/css/**/*.css to ${to}`);
    return rsync(PLI.target.test.css, to);
  }
}