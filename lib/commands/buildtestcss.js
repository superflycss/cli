"use strict";

const btc = require('../../lib/build/btc');
const log = require('node-pretty-log');

module.exports = (cli) => {
    cli.
        command('build:test:css').
        alias('btc').
        description('Build Test CSS').
        action(() => {
            btc().then(log('info', 'Completed build of test css content'));
        });
}