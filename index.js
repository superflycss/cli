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
    log('info', 'Cleaning up');
    del(pli.TARGET);
});

cli.
command('build:main:css').
alias('bmc').
description('Build Main CSS').action(()=>{
    log('info', 'Starting main CSS build');
    buildMainCSS();
    log('info', 'Main CSS build complete!');
});

cli.
command('build:test:css').
alias('btc').
description('Build Test CSS').action(()=>{
    log('info', 'Starting test CSS build');
    buildTestCSS();
    log('info', 'Test CSS build complete!');
});

cli.parse(process.argv);
