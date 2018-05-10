"use strict";

const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const globby = require('globby');
const del = require('del');
const process = require('./process');

module.exports = () => {
    log('info', 'Deleting target/main/css/**/*.css content.');
    del.sync(PLI.TARGET_MAIN_CSS);
    log('info', 'Building src/main/css/**/*.css content.');
    return globby([PLI.SRC_MAIN_CSS]).then(process);
}
