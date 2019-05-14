"use strict";

const fs = require('fs-extra');
const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const postcss = require('postcss');
const globby = require('globby');
const postcss_plugins = [];

exports.bmfc = () => {
    const html = globby.sync([PLI.TARGET_MAIN_HTML])
    if (html.length > 0) {
      const postcss_uncss = require("postcss-uncss")({ html: html });
      postcss_plugins.push(postcss_uncss);
    }
    if (postcss_plugins.length > 0) {
        log('info', 'Filtering target/main/css/**/*.css content.');
        return globby([PLI.TARGET_MAIN_CSS]).then(process);
    }
    else {
        log('info', 'Not filtering target/main/css/**/*.css content, since there are no html files.');
        return Promise.resolve();
    }
}

exports.btfc = () => {
    const html = globby.sync([PLI.TARGET_TEST_HTML])
    if (html.length > 0) {
      const postcss_uncss = require("postcss-uncss")({ html: html });
      postcss_plugins.push(postcss_uncss);
    }
    if (postcss_plugins.length > 0) {
        log('info', 'Filtering target/test/css/**/*.css content.');
        return globby([PLI.TARGET_TEST_CSS]).then(process);
    }
    else {
        log('info', 'Not filtering target/test/css/**/*.css content, since there are no html files.');
        return Promise.resolve();
    }
}

/**
 * @function  [process] Load src css files, compile in parallel, and save the result 
 * @param paths An array containing all the paths we are processings
 * @return {Promise} A promise instance to facilitate calling the next function in the build chain
 */
function process(paths) {
    return Promise.all(paths.map(file => new Promise((resolve) => {

        fs.readFile(file, (err, css) => {
            let targetFile = file.replace(PLI.SRC, PLI.TARGET);

            postcss(postcss_plugins)
                .process(css, { from: file, to: targetFile })
                .then(result => {
                    targetFile = targetFile.replace(/\.[^\.]+$/, '.filtered.css');
                    fs.writeFileSync(targetFile, result.css);
                    if (result.map) {
                       fs.writeFileSync(targetFile + '.map', result.map);
                    }
                    resolve();
                });
        });
    })));
}