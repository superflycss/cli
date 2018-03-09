#!/usr/bin/env node

const log = require('node-pretty-log');

const fs = require('fs');
const del = require('del');
const mkdirp = require('mkdirp');
const pli = require('@superflycss/pli');
const cli = require('commander');
const path = require('path');
const globby = require('globby');

const postcss = require('postcss');
var pc_import = require('postcss-import');
var pc_calc = require('postcss-calc');
var pc_custom_properties = require('postcss-custom-properties');
var pc_color = require('postcss-color-function');
var pc_sass_color = require("postcss-sass-color-functions");
var pc_each = require('postcss-each');
var pc_for = require('postcss-for');
var pc_apply = require('postcss-apply');
var pc_reporter = require('postcss-reporter');
var pc_custom_media = require('postcss-custom-media');
var pc_font_magician = require('postcss-font-magician');
const autoprefixer = require('autoprefixer');
const nunjucks = require('nunjucks');
const highlight = require('highlight.js');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const postcss_plugins = 
   [pc_import, 
    pc_each, 
    pc_for, 
    pc_custom_properties,
    pc_apply, 
    pc_calc, 
    pc_color, 
    pc_sass_color, 
    pc_custom_media, 
    pc_font_magician, 
    autoprefixer, pc_reporter({
        clearMessages: true
    })]; 

function testCSS() {
    console.log(pli.SRC_TEST_HTML);
    globby([pli.SRC_TEST_HTML]).then((paths)=> {
        paths.forEach(source=>{
            const filename =  source.substring(pli.src.test.html.length);
            const target = path.join(pli.target.test.html, filename);
            fs.readFile(source, (err, html) => {
            const dom = new JSDOM(html);
            const document = dom.window.document;

            document.querySelectorAll('.Test_markup > code').forEach((node)=> {
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

              document2.querySelectorAll('.Test_markup > code').forEach((node)=> {
                var markup = node.innerHTML;
                node.innerHTML = highlight.highlight('html', markup).value;
              });
  
              mkdirp.sync(pli.target.test.html);
              fs.writeFileSync(target, dom2.serialize());
            });        
        });
    });
}


function buildMainCSS() {
   globby([pli.SRC_MAIN_CSS]).then((paths)=>{
       paths.forEach(source=>{
           const filename =  source.substring(pli.src.main.css.length);
           const target = path.join(pli.target.main.css, filename);
           fs.readFile(source, (err, css) => {
               postcss(postcss_plugins)
                   .process(css, { from: source, to: target })
                   .then(result => {
                        mkdirp.sync(pli.target.main.css);
                        fs.writeFileSync(target, result.css);
                        if ( result.map ) fs.writeFileSync(target+'.map', result.map);
                });
           });
       });
   });
}

function buildTestCSS() {
    globby([pli.SRC_TEST_CSS]).then((paths)=>{
        paths.forEach(source=>{
            const filename =  source.substring(pli.src.test.css.length);
            const target = path.join(pli.target.test.css, filename);
            fs.readFile(source, (err, css) => {
                postcss(postcss_plugins)
                    .process(css, { from: source, to: target })
                    .then(result => {
                         mkdirp.sync(pli.target.test.css);
                         fs.writeFileSync(target, result.css);
                         if ( result.map ) fs.writeFileSync(target+'.map', result.map);
                 });
            });
        });
    });
 }

cli.
version('1.0.0').
description('SuperflyCSS Command Line Interface');

cli.
command('clean').
alias('c').
description('Clean the build (Removes target folder)').
action(()=>{
    del(pli.TARGET);
    log('info', 'Clean up complete.');
});

cli.
command('build:main:css').
alias('bmc').
description('Build Main CSS').action(()=>{
    log('info', 'Starting main CSS build.');
    buildMainCSS();
    log('info', 'Main CSS build complete.');
});

cli.
command('build:test:css').
alias('btc').
description('Build Test CSS').action(()=>{
    log('info', 'Starting test CSS build.');
    buildTestCSS();
    log('info', 'Test CSS build complete.');
});

cli.
command('test:css').
alias('tc').
description('Test CSS').action(()=>{
    log('info', 'Starting build html test templates.');
    testCSS();
    log('info', 'Completed build of html test templates.');
});

cli.parse(process.argv);


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}