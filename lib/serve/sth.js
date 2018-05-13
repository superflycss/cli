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
    log('info', 'Deleting serve/**/*.html content.');
    return del(PLI.SERVE_TEST_HTML).then(()=>{
        log('info', 'Building src/test/html/ content.');
        return globby([PLI.SRC_TEST_HTML]).then((paths)=> {
            return Promise.all(paths.map(file => new Promise((resolve) => {
                paths.forEach(source => {

                    console.log("path.dirname(source)", path.dirname(source));

                    const targetDirectory = PLI.SERVE;
                    const targetFile = source.replace(PLI.src.test.html, PLI.SERVE);        
                    
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
        });
    });
}