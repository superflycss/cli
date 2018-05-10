"use strict";

const btc = require('../../lib/build/btc');

module.exports = (cli) => {
    cli.
        command('build:test:css').
        alias('btc').
        description('Build Test CSS').
        action(() => {
            btc();
        });
}