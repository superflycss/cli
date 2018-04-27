#!/usr/bin/env node
const log = require('node-pretty-log');

const fs = require('fs-extra');
const cpy = require('cpy');
const del = require('del');
const mkdirp = require('mkdirp');
const PLI = require('@superflycss/pli');
const cli = require('commander');
const path = require('path');
const globby = require('globby');
const gaze = require('gaze');

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

//GENERATORS 
const generatePackageJson = require('./lib/generators/package-json');
const generateTestHtml = require('./lib/generators/index-html');
const generateGitignore = require('./lib/generators/gitignore');

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

function buildTestHtml() {
    log('info', 'Deleting target/test/html/ content.');
    del(PLI.TARGET_TEST_HTML);
    log('info', 'Building src/test/html/ content.');
    globby([PLI.SRC_TEST_HTML]).then((paths) => {
        paths.forEach(source => {
            const filename = source.substring(PLI.src.test.html.length);
            const target = path.join(PLI.target.test.html, filename);
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

                mkdirp.sync(PLI.target.test.html);
                fs.writeFileSync(target, dom2.serialize());
            });
        });
    });
}


function buildMainCSS() {
    log('info', 'Deleting target/main/css/**/*.css content.');
    del(PLI.TARGET_MAIN_CSS);
    log('info', 'Building src/main/css/**/*.css content.');
    globby([PLI.SRC_MAIN_CSS]).then((paths) => {
        paths.forEach(source => {
            const filename = source.substring(PLI.src.main.css.length);
            const target = path.join(PLI.target.main.css, filename);
            fs.readFile(source, (err, css) => {
                postcss(postcss_plugins)
                    .process(css, { from: source, to: target })
                    .then(result => {
                        mkdirp.sync(PLI.target.main.css);
                        fs.writeFileSync(target, result.css);
                        if (result.map) fs.writeFileSync(target + '.map', result.map);
                    });
            });
        });
    });
}

function buildTestCSS() {
    log('info', 'Deleting target/test/css/ content.');
    del(PLI.TARGET_TEST_CSS);
    log('info', 'Building src/test/css content.');
    globby([PLI.SRC_TEST_CSS]).then((paths) => {
        paths.forEach(source => {
            const filename = source.substring(PLI.src.test.css.length);
            const target = path.join(PLI.target.test.css, filename);
            fs.readFile(source, (err, css) => {
                postcss(postcss_plugins)
                    .process(css, { from: source, to: target })
                    .then(result => {
                        mkdirp.sync(PLI.target.test.css);
                        fs.writeFileSync(target, result.css);
                        if (result.map) fs.writeFileSync(target + '.map', result.map);
                    });
            });
        });
    });
}

cli.
    version('1.0.0').
    description('SuperflyCSS Command Line Interface');

cli.
    command('new').
    alias('n').
    description('Create a new project').
    action((name) => {        
        if (!name.includes("-")) {
            log('warn', "Project names should include a - character");
        }
        mkdirp.sync(`${name}/${PLI.src.main.css}`);
        mkdirp.sync(`${name}/${PLI.src.test.css}`);
        mkdirp.sync(`${name}/${PLI.src.main.html}`);
        mkdirp.sync(`${name}/${PLI.src.test.html}`);
        mkdirp.sync(`${name}/${PLI.src.main.js}`);
        mkdirp.sync(`${name}/${PLI.src.test.js}`);
        fs.writeFileSync(`./${name}/package.json`, generatePackageJson(name));
        fs.writeFileSync(`./${name}/.gitignore`, generateGitignore());
        fs.writeFileSync(`./${name}/${PLI.src.test.html}/index.html`, generateTestHtml(name));
    });

cli.
    command('clean').
    alias('c').
    description('Clean the build (Removes target folder)').
    action(() => {
        del(PLI.TARGET);
        log('info', 'Clean up complete.');
    });

cli.
    command('build:main:css').
    alias('bmc').
    description('Build Main CSS').action(() => {
        log('info', 'Starting main CSS build.');
        buildMainCSS();
        log('info', 'Main CSS build complete.');
    });

cli.
    command('build:test:css').
    alias('btc').
    description('Build Test CSS').action(() => {
        log('info', 'Starting test CSS build.');
        buildTestCSS();
        log('info', 'Test CSS build complete.');
    });

cli.
    command('test:html').
    alias('th').
    description('Test CSS').action(() => {
        log('info', 'Starting build html test templates.');
        buildTestHtml();
        log('info', 'Completed build of html test templates.');
    });

cli.
    command('serve').
    alias('s').
    description('Serve project').
    action(() => {
        buildMainCSS();
        buildTestCSS();
        buildTestHtml();
        var bs = require("browser-sync").create();

        // Start the browsersync server
        bs.init({
            server: PLI.TARGET
        });

        bs.reload("*.html");

        gaze(PLI.SRC_MAIN_CSS, (err, watcher) => {

            if (err) {
                log('error', 'Error buliding src/main/css/ content.');
                throw new Error(err);
            }

            /**
             * Triggered both when new files are added and when files are changed.
             */
            watcher.on('changed', function (filepath) {
                buildMainCSS();
            });
        });

        gaze(PLI.SRC_TEST_CSS, (err, watcher) => {

            if (err) {
                log('error', 'Error buliding src/test/css/ content.');
                throw new Error(err);
            }

            /**
             * Triggered both when new files are added and when files are changed.
             */
            watcher.on('changed', function (filepath) {
                buildTestCSS();
            });
        });

        gaze(PLI.SRC_TEST_HTML, (err, watcher) => {

            if (err) {
                log('error', 'Error buliding src/test/html content.');
                throw new Error(err);
            }

            /**
             * Triggered both when new files are added and when files are changed.
             */
            watcher.on('changed', function (filepath) {
                buildTestHtml();
            });
        });
    });

    cli.
    command('prepublish').
    alias('p').
    description('Prepublish the CSS').action(() => {
        log('info', 'Prepublishing...');
        del(PLI.DIST);
        mkdirp.sync(PLI.DIST);
        cpy(PLI.SRC_MAIN_CSS, PLI.DIST);
        cpy('./package.json', PLI.DIST);
        log('info', 'Completed prepublishing.');
    });

cli.parse(process.argv);

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
