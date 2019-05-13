"use strict";

const PLI = require('@superflycss/pli');
const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
const highlight = require('highlight.js');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
nunjucks.configure([
    PLI.NODE_MODULES, 
    PLI.src.main.njk, 
    PLI.src.test.njk, 
    PLI.src.main.html, 
    PLI.src.test.html]);

 /**
  * @param {*} html The html to be processed by the runner. 
  */
const runner =  (html)=> {
    let rendered = nunjucks.renderString(html);

    const dom = new JSDOM(rendered);
    const document2 = dom.window.document;

    document2.querySelectorAll('.TestMarkup > code').forEach((node) => {
        var markup = node.innerHTML;
        node.innerHTML = highlight.highlight('html', markup).value;
    });
    return dom;
}

/**
 * Load src html files, compile in parallel, and save the result
 * 
 * @param paths An array containing all the paths we are processings
 * @return A promise instance to facilitate calling the next function in the build chain
 */
module.exports = (paths) => {
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