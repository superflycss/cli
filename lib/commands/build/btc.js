const del = require('del');
const globby = require('globby');
const PLI = require('@superflycss/pli');
const log = require('node-pretty-log');
const css = require('../../helpers/build').css;

module.exports = () => {
    log('info', 'Deleting target/test/css/ content.');
    del.sync(PLI.TARGET_TEST_CSS);
    log('info', 'Building src/test/css content.');
    return globby([PLI.SRC_TEST_CSS]).then(css);
}