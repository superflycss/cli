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
const runner = require('..//dom/test/runner');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = () => {
    log('info', 'Deleting serve/**/*.html content.');
    return del(PLI.SERVE_TEST_HTML).then(() => {
        log('info', 'Building src/test/html/ content.');
        return globby([PLI.SRC_TEST_HTML]).then((paths) => {
            return Promise.all(paths.map(source => new Promise((resolve) => {
                const targetDirectory =
                    path.dirname(source).
                    replace(PLI.src.test.html, PLI.SERVE);
                const targetFile = source.replace(PLI.src.test.html, PLI.SERVE);

                fs.readFile(source, (err, html) => {
                    const html2 = runner(html);
                    mkdirp.sync(targetDirectory);
                    fs.writeFileSync(targetFile, html2.serialize());
                    resolve();
                });
            })));
        });
    });
}