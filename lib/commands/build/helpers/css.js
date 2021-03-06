"use strict";

const fs = require('fs-extra');
const PLI = require('@superflycss/pli');
const path = require('path');
const mkdirp = require('mkdirp');
const postcss = require('postcss');
const plugins = require('../../../plugins');

/**
 * Load src css files, compile in parallel, 
 * and save the result 
 * @param paths An array containing all the css file paths we are processings
 * @return A promise instance to facilitate calling the next function in the build chain
 */
module.exports = (paths) => {
    return Promise.all(paths.map(file => new Promise((resolve) => {

        fs.readFile(file, (err, css) => {
            const targetDirectory = path.dirname(file).replace(PLI.SRC, PLI.TARGET);
            const targetFile = file.replace(PLI.SRC, PLI.TARGET);

            postcss(plugins)
                .process(css, { from: file, to: targetFile })
                .then(result => {
                    mkdirp.sync(targetDirectory);
                    fs.writeFileSync(targetFile, result.css);
                    if (result.map) fs.writeFileSync(targetFile + '.map', result.map);
                    resolve();
                });
        });
    })));
}