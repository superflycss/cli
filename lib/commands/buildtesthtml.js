"use strict";

const bth = require('../../lib/build/bth');
const log = require('node-pretty-log');

module.exports = (cli) => {
    cli.
        command('build:test:html').
        alias('bth').
        description('Build Test HTML').
        action(() => {
            bth().then(log('info', 'Completed build of test html content'));
        });
}