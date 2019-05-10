const del = require('del');
const globby = require('globby');
const PLI = require('@superflycss/pli');
const log = require('node-pretty-log');

module.exports = ()=> {
    log('info', 'Deleting target/test/html/ content.');
    del.sync(PLI.TARGET_TEST_HTML);
    log('info', 'Building src/test/html/ content.');
    return globby([PLI.SRC_TEST_HTML]).then((process));
}