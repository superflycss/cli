"use strict";

const fs = require('fs-extra');
const PLI = require('@superflycss/pli');
const path = require('path');
const mkdirp = require('mkdirp');
const postcss = require('postcss');
const sugarss = require('sugarss');
const plugins = require('../plugins');

/**
 * @function  [process] Load src css files, compile in parallel, and save the result 
 * @param paths An array containing all the paths we are processings
 * @return {Promise} A promise instance to facilitate calling the next function in the build chain
 */
exports.css = (paths) => {
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


/**
 * Note that the string `sss` is replaced with `css` therefore
 * its best if name of files don't use the string `sss` anywhere besides the 
 * extension.
 * 
 * @function  [process] Load src sss files, compile in parallel, and save the result 
 * @param paths An array containing all the paths we are processings
 * @return {Promise} A promise instance to facilitate calling the next function in the build chain
 */
exports.sss = (paths) => {
    return Promise.all(paths.map(file => new Promise((resolve) => {

        fs.readFile(file, (err, sss) => {
            let targetDirectory = path.dirname(file).replace(PLI.SRC, PLI.TARGET);
            targetDirectory = targetDirectory.replace(/sss/g, 'css');
            let targetFile = file.replace(PLI.SRC, PLI.TARGET);
            targetFile = targetFile.replace(/sss/g, 'css');

            postcss(plugins)
                .process(sss, { parser: sugarss, from: file, to: targetFile })
                .then(result => {
                    mkdirp.sync(targetDirectory);
                    fs.writeFileSync(targetFile, result.css);
                    if (result.map) fs.writeFileSync(targetFile + '.map', result.map);
                    resolve();
                });
        });
    })));
}
