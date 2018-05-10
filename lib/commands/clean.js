"use strict";

const del = require('del');
const log = require('node-pretty-log');
const PLI = require('@superflycss/pli');

module.exports = (cli) => {
cli.
    command('clean').
    alias('c').
    description('Clean the build (Removes target folder)').
    action(() => {
        log('info', 'Deleting target.');
        del(PLI.TARGET);
        log('info', 'Deleting dist.');
        del(PLI.DIST);
        log('info', 'Deleting deploy.');
        del(PLI.DEPLOY);
        log('info', 'Deleting serve.');
        del(PLI.SERVE);
        log('info', 'Clean up complete.');
    });
}