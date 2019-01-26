"use strict";

const bmmc = require('../build/bmmc');
const btmc = require('../build/btmc');
const log = require('node-pretty-log');

module.exports = (cli) => {
    cli.
        command('build:main:min:css').
        alias('bmmc').
        description('Build main min css)').
        action(() => {
            bmmc().then(log('info', 'Completed build of main minified css content'));
        });
}

module.exports = (cli) => {
    cli.
        command('build:test:min:css').
        alias('btmc').
        description('Build test min css)').
        action(() => {
            btmc().then(log('info', 'Completed build of test minified css content'));
        });
}