"use strict";

const bmc = require('../../lib/build/bmc');

module.exports = (cli) => {
    cli.
        command('build:main:css').
        alias('bmc').
        description('Build main css)').
        action(() => {
            bmc();
        });
}