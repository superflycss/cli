"use strict";

const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');
const bmh = require('./build/bmh');
const bth = require('./build/bth');
const bmc = require('./build/bmc');
const btc = require('./build/btc');
const bms = require('./build/bms');
const bmfc = require('../helpers/filter').bmfc;
const btfc = require('../helpers/filter').btfc;
const bmmc = require('../helpers/min').bmmc;
const btmc = require('../helpers/min').btmc;
const bmmd = require('../helpers/md').bmmd;
const btmd = require('../helpers/md').btmd;
const copyTestSVG = require('../utilities/copytestsvg');

module.exports = (cli) => {
    cli.
    command('build').
    alias('b').
    description('Build main css, test css, and test html').
    action((name) => {
        copyTestSVG(PLI.target.test.svg);
        bmmd().then(
            ()=>{
                log('info', 'Completed build of src/main/md content');
                bmh().then(log('info', 'Completed build of src/main/html content'));
        });
        btmd().then(()=>{
            log('info', 'Completed build of src/test/md content');   
            bth().then(log('info', 'Completed build of src/test/html content'));
        });
        bmc().then(log('info', 'Completed build of src/main/css content'));
        bms().then(log('info', "Completed build of src/main/sss content"));
        btc().then(log('info', 'Completed build of src/test/css content'));
    });

    cli.command('build:main:md').
    alias('bmmd').
    description('Build main md)').
    action(() => {
        bmmd().then(log('info', 'Completed build of main md content'));
    });

    cli.command('build:test:md').
    alias('btmd').
    description('Build test md)').
    action(() => {
        btmd().then(log('info', 'Completed build of test md content'));
    });

    cli.command('build:main:css').
    alias('bmc').
    description('Build main css)').
    action(() => {
        bmc().then(log('info', 'Completed build of main css content'));
    });

    cli.
    command('build:test:css').
    alias('btc').
    description('Build Test CSS').
    action(() => {
        btc().then(log('info', 'Completed build of test css content'));
    });

    cli.
    command('build:main:html').
    alias('bmh').
    description('Build Main HTML').
    action(() => {
        bmh().then(log('info', 'Completed build of main html content'));
    });

    cli.
    command('build:test:html').
    alias('bth').
    description('Build Test HTML').
    action(() => {
        bth().then(log('info', 'Completed build of test html content'));
    });

    cli.
    command('build:main:filtered:css').
    alias('bmfc').
    description('Build Main Filtered CSS').
    action(() => {
        bmfc().then(log('info', 'Completed filtering of main css content'));
    }); 

    cli.
    command('build:test:filtered:css').
    alias('btfc').
    description('Build Test Filtered CSS').
    action(() => {
        btfc().then(log('info', 'Completed filtering of test css content'));
    }); 

    cli.
    command('build:main:minified:css').
    alias('bmmc').
    description('Build Main Minified CSS').
    action(() => {
        bmmc().then(log('info', 'Completed minification of test css content'));
    }); 

    cli.
    command('build:test:minified:css').
    alias('btmc').
    description('Build Test Minified CSS').
    action(() => {
        btmc().then(log('info', 'Completed minification of test css content'));
    }); 
}