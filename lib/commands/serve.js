"use strict";

const stc = require('../serve/stc');
const sth = require('../serve/sth');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const PLI = require('@superflycss/pli');
const gaze = require('gaze');

module.exports = (cli) => {
    cli.
    command('serve').
    alias('s').
    description('Serve test css and html').
    action((name) => {
        sth();
        stc().then(()=> {
            var bs = require("browser-sync").create();
            bs.init({server: PLI.SERVE}); 
            gazeTestCss(bs);
            gazeTestHtml(bs);
        });
    });
}

function gazeTestCss(bs) {
    gaze(PLI.SRC_TEST_HTML, (err, watcher) => {

        if (err) {
            log('error', 'Error buliding src/test/html content.');
            throw new Error(err);
        }

        /**
         * Triggered both when new files are added and when files are changed.
         */
        watcher.on('changed', function (filepath) {
            sth().then(()=>{
                bs.reload("*.html");
            })
        });
    });
}

function gazeTestHtml(bs) {
    gaze(PLI.SRC_TEST_CSS, (err, watcher) => {

        if (err) {
            log('error', 'Error buliding src/test/css/ content.');
            throw new Error(err);
        }

        /**
         * Triggered both when new files are added and when files are changed.
         */
        watcher.on('changed', function (filepath) {
            stc().then(()=>{
                bs.reload("*.css");
            });
        });
    });
}