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
const insertAfter = require('../../lib/dom/');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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
    return Promise.all(paths.map(file => new Promise((resolve) => {
        paths.forEach(source => {
            const targetDirectory = path.dirname(source).replace(PLI.SRC, PLI.TARGET);
            const targetFile = source.replace(PLI.SRC, PLI.TARGET);
            fs.readFile(source, (err, html) => {
                const dom = new JSDOM(html);
                const document = dom.window.document;
    
                document.querySelectorAll('.Test_markup > code').forEach((node) => {
                    var markup = node.innerHTML;
                    var testDescriptionNode =
                        node.parentElement.parentElement.nextElementSibling.querySelector('.Test_description');
                    var renderTestBlock = document.createElement('div');
                    renderTestBlock.innerHTML = markup;
                    renderTestBlock.setAttribute('class', "Test_render");
                    insertAfter(testDescriptionNode, renderTestBlock);
                });
    
                let rendered = nunjucks.renderString(dom.serialize());
    
                const dom2 = new JSDOM(rendered);
                const document2 = dom2.window.document;
    
                document2.querySelectorAll('.Test_markup > code').forEach((node) => {
                    var markup = node.innerHTML;
                    node.innerHTML = highlight.highlight('html', markup).value;
                });
    
                mkdirp.sync(targetDirectory);
                fs.writeFileSync(targetFile, dom2.serialize());
            });
            resolve();
        });
    })));
}