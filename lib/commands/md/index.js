"use strict";

const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const globby = require('globby');
const del = require('del');
const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');

var md = require("markdown-it")({
    html: false,
    xhtmlOut: true,
    typographer: true
}).use( require("markdown-it-anchor"), { permalink: true, permalinkBefore: true, permalinkSymbol: '§' } )
  .use( require("markdown-it-toc-done-right") );
 
PLI.SERVE_TEST_CSS = path.join(PLI.SERVE, GLOB.ALL_CSS);

exports.bmmd = ()=> {
    log('info', 'Deleting target/main/md/**/*.md');
    del(PLI.TARGET_MAIN_MD);
    log('info', 'Building src/test/html/ content.');
    return globby([PLI.SRC_MAIN_MD]).then((process));
}

exports.btmd = ()=> {
    log('info', 'Deleting target/test/md/**/*.md');
    del(PLI.TARGET_TEST_MD);
    log('info', 'Building src/test/md/ content.');
    return globby([PLI.SRC_TEST_MD]).then((process));
}

/**
 * Load src html files, compile in parallel, and save the result
 * @param paths An array containing all the paths we are processings
 * @return A promise instance to facilitate calling the next function in the build chain
 */
function process(paths) {
    return Promise.all(paths.map(source => new Promise((resolve) => {
            const targetDirectory = 
            path.dirname(source).
            replace('md', 'html');
            let targetFile = 
            source.
            replace('md', 'html');
            targetFile = targetFile.replace(/\.[^\.]+$/, ".md.html");

            fs.readFile(source, 'utf8', (err, markdown) => {
                const html = md.render(markdown);
                mkdirp.sync(targetDirectory);
                fs.writeFileSync(targetFile, html);
                resolve();
            });
    })));
}