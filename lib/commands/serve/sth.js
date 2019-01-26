"use strict";

const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const globby = require('globby');
const del = require('del');
const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const runner = require('../../dom/test/runner');

module.exports = () => {
    log('info', 'Deleting serve/**/*.html content.');
    return del(PLI.SERVE_TEST_HTML).then(() => {
        log('info', 'Building src/test/html/ content.');
        return globby([PLI.SRC_TEST_HTML]).then((paths) => {
            return Promise.all(paths.map(source => new Promise((resolve) => {
                const targetFile = source.replace(PLI.src.test.html, PLI.SERVE);
                const targetDirectory = path.dirname(targetFile);
            
                fs.readFile(source, 'utf8', (err, html) => {
                    const html2 = runner(html);
                    mkdirp.sync(targetDirectory);
                    fs.writeFileSync(targetFile, html2.serialize());
                    resolve();
                });
            })));
        });
    });
}