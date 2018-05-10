"use strict";

const bth = require('../../lib/build/bth');

module.exports = (cli) => {
    cli.
        command('build:test:html').
        alias('bth').
        description('Build Test HTML').
        action(() => {
            bth();
        });
}