"use strict";

const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const globby = require('globby');
const del = require('del');
const process = require('./process');

module.exports = () => {
    log('info', 'Deleting serve/css/ content.');
    del(PLI.serve.css);
    log('info', 'Building serve/css content.');
    return globby([PLI.SRC_TEST_CSS]).then((process));
}
