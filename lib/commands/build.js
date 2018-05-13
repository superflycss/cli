"use strict";

const log = require('node-pretty-log');
const bmc = require('../../lib/build/bmc');
const bth = require('../../lib/build/bth');
const btc = require('../../lib/build/btc');


module.exports = (cli) => {
    cli.
    command('build').
    alias('b').
    description('Build main css, test css, and test html').
    action(() => {
        bmc().
        then(log('info', 'Completed build of src/main/css content'));
        btc().
        then(log('info', 'Completed build of src/test/css content'));
        bth().  
        then(log('info', 'Completed build of src/test/html content'));
    });
}