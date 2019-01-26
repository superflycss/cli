"use strict";

const fs = require('fs-extra');
const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const path = require('path');
const mkdirp = require('mkdirp');
const postcss = require('postcss');
const postcss_plugins = require('../../plugins');

/**
 * Load src css files, compile in parallel, and save the result
 * @param paths An array containing all the paths we are processings
 * @return A promise instance to facilitate calling the next function in the build chain
 */
module.exports = (paths) => {
    
    return Promise.all(paths.map(source => new Promise((resolve) => {

        fs.readFile(source, (err, css) => {

            const targetDirectory = path.dirname(source).replace(PLI.SRC_TEST, PLI.SERVE);
            const targetFile = source.replace(PLI.SRC_TEST, PLI.SERVE);        

            postcss(postcss_plugins)
                .process(css, { from: source, to: targetFile })
                .then(result => {
                    mkdirp.sync(targetDirectory);                    
                    fs.writeFileSync(targetFile, result.css);
                    if (result.map) fs.writeFileSync(targetFile + '.map', result.map);
                    resolve();
                });
            log('info', 'Completed build of css test content');
        });
    })));
}