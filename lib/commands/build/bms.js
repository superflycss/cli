const del = require('del');
const globby = require('globby');
const PLI = require('@superflycss/pli');
const log = require('node-pretty-log');
const sss = require('./helpers/sss');

module.exports = async () => {
    log('info', 'Deleting target/main/css/**/*.css content.');
    del.sync(PLI.TARGET_MAIN_CSS);
    log('info', 'Building src/main/sss/**/*.sss content.');
    log('info', PLI.SRC_MAIN_SSS);
    const paths = await globby([PLI.SRC_MAIN_SSS]);
    return sss(paths);
}
