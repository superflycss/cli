"use strict";

const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const PLI = require('@superflycss/pli');
const del = require('del');
const log = require('node-pretty-log');
const cpy = require('cpy');
const rsync = require('recursive-copy');

module.exports = (cli) => {
    cli.
    command('dist').
    alias('d').
    description('Prepare dist directory for publishing to NPM').
    action(() => {
        log('info', 'Deleting the dist directory');
        del.sync(PLI.DIST);
        log('info', 'Creating the dist directory');
        mkdirp.sync(PLI.DIST);
        log('info', 'Copying package.json to dist');
        cpy('./package.json', PLI.DIST);
        log('info', 'Copying README.md dist');
        cpy('./README.md', PLI.DIST);
        log('info', 'Copying LICENSE.md dist');
        cpy('./LICENSE.md', PLI.DIST);
        rsync(PLI.src.main.css, PLI.DIST, function (error, results) {
            if (error) {
                console.error('Prepublish of main css files failed: ' + error);
            } else {
                console.info('Prepublished css files');
            }
        });
        if (fs.existsSync(PLI.src.main.njk)) {
            rsync(PLI.src.main.njk, PLI.DIST, function (error, results) {
                if (error) {
                    console.error('Prepublish of main njk files failed: ' + error);
                } else {
                    console.info('Prepublished njk files');
                }
            });    
        }
        if (fs.existsSync(PLI.src.main.svg)) {
            rsync(PLI.src.main.svg, PLI.DIST, function (error, results) {
                if (error) {
                    console.error('Prepublish of main svg files failed: ' + error);
                } else {
                    console.info('Prepublished svg files');
                }
            });    
        }
    });
}