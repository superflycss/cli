const del = require('del');
const globby = require('globby');
const PLI = require('@superflycss/pli');
const log = require('node-pretty-log');
const process = require('./helpers/html');

module.exports = ()=> {
    log('info', 'Deleting target/main/html/ content.');
    del.sync(PLI.TARGET_MAIN_HTML);
    log('info', 'Building src/test/html/ content.');
    return globby([PLI.SRC_MAIN_HTML]).then((process));
}