"use strict";

const bmc = require('../../lib/build/bmc');
const log = require('node-pretty-log');

module.exports = (cli) => {
    cli.
        command('build:main:css').
        alias('bmc').
        description('Build main css)').
        action(() => {
            bmc().then(log('info', 'Completed build of main css content'));
        });
}