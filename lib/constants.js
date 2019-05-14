const path = require('path');
const PLI = require("@superflycss/pli");

module.exports.MAIN_FILTERED_CSS = path.join(PLI.target.main.css, '**/*filtered.css');
module.exports.TEST_FILTERED_CSS = path.join(PLI.target.test.css, '**/*filtered.css');
module.exports.MAIN_MIN_CSS = path.join(PLI.target.main.css, '**/*min.css');
module.exports.TEST_MIN_CSS = path.join(PLI.target.test.css, '**/*min.css');
module.exports.DEPLOY_MIN_CSS_FILE_PATH = path.join(PLI.deploy.css, 'index.filtered.min.css');
module.exports.DEPLOY_RENAMED_MIN_CSS_FILE_PATH = path.join(PLI.deploy.css, 'index.css');
