"use strict";

const nunjucks = require('nunjucks');
const highlight = require('highlight.js');
const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const globby = require('globby');
const del = require('del');
const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const runner = require('../dom/test/runner');

module.exports = ()=> {
    log('info', 'Deleting target/test/html/ content.');
    del.sync(PLI.TARGET_TEST_HTML);
    log('info', 'Building src/test/html/ content.');
    return globby([PLI.SRC_TEST_HTML]).then((process));
}

/**
 * Load src html files, compile in parallel, and save the result
 * @param paths An array containing all the paths we are processings
 * @return A promise instance to facilitate calling the next function in the build chain
 */
function process(paths) {
    return Promise.all(paths.map(source => new Promise((resolve) => {
            const targetDirectory = path.dirname(source).replace(PLI.SRC, PLI.TARGET);
            const targetFile = source.replace(PLI.SRC, PLI.TARGET);
            fs.readFile(source, 'utf8', (err, html) => {
                const html2 = runner(html);
                mkdirp.sync(targetDirectory);
                fs.writeFileSync(targetFile, html2.serialize());
                resolve();
            });
    })));
}