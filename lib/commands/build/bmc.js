const del = require('del');
const globby = require('globby');
const PLI = require('@superflycss/pli');
const log = require('node-pretty-log');
const css = require('./helpers/css');

module.exports = async () => {
    log('info', 'Deleting target/main/css/**/*.css content.');
    del.sync(PLI.TARGET_MAIN_CSS);
    log('info', 'Building src/main/css/**/*.css content.');
    const paths = await globby([PLI.SRC_MAIN_CSS]);
    return css(paths);
}
