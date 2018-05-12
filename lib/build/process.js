"use strict";

const fs = require('fs-extra');
const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const path = require('path');
const mkdirp = require('mkdirp');
const postcss = require('postcss');
const postcss_plugins = require('../../lib/plugins');

/**
 * @function  [process] Load src css files, compile in parallel, and save the result 
 * @param paths An array containing all the paths we are processings
 * @return {Promise} A promise instance to facilitate calling the next function in the build chain
 */
module.exports = (paths) => {
    return Promise.all(paths.map(file => new Promise((resolve) => {

        fs.readFile(file, (err, css) => {
            const targetDirectory = path.dirname(file).replace(PLI.SRC, PLI.TARGET);
            const targetFile = file.replace(PLI.SRC, PLI.TARGET);

            postcss(postcss_plugins)
                .process(css, { from: file, to: targetFile })
                .then(result => {
                    mkdirp.sync(targetDirectory);
                    fs.writeFileSync(targetFile, result.css);
                    if (result.map) fs.writeFileSync(targetFile + '.map', result.map);
                });
            resolve();
        });
    })));
}
