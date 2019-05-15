"use strict";
const PLI = require("@superflycss/pli");
const log = require("node-pretty-log");
var fs = require("fs");
const del = require("del");
const bs = require("browser-sync").create();
const copySrcTestSVG = require("../utilities/copysrctestsvg");
const copyTargetTestHTML = require("./serve/copyTargetTestHTML");
const copyTargetTestCSS = require("./serve/copyTargetTestCSS");
const runTargetBuild = require("./build").runBuild;
const btfc = require("./filter").btfc;
const btmc = require("./min").btmc;
const c = require('../constants');

function startbs() {
  log("info", "Starting browsersync");
  bs.init({ server: PLI.DEPLOY });
}

module.exports = cli => {
  cli
    .command("deploys")
    .alias("des")
    .description("Compile and serve optimized test md, svg, css and test html")
    .action(name => {
      runBuild().then(() => startbs());
    });
};

function runBuild() {
  return new Promise(async resolve => {
    runTargetBuild().then(async () => {
      await btfc();
      await btmc();
      log("info", "Deleting deploy/svg/**/*.svg");
      del.sync(PLI.DEPLOY_TEST_SVG);
      log("info", "Copying src/test/svg/**/*.svg to serve/svg/");
      copySrcTestSVG(PLI.deploy.svg);
      log("info", "Deleting deploy/css/**/*.css");
      del.sync(PLI.DEPLOY_TEST_CSS);
      await copyTargetTestCSS(PLI.deploy.css);
      log("info", "Rename  deploy/css/index.filtered.min.css to deploy/css/index.css");
      fs.renameSync(c.DEPLOY_MIN_CSS_FILE_PATH, c.DEPLOY_RENAMED_MIN_CSS_FILE_PATH);
      log("info", `Deleting ${c.DEPLOY_MIN_CSS_FILE_PATH}`);
      del.sync(c.DEPLOY_MIN_CSS_FILE_PATH);
      log("info", "Deleting deploy/**/*.html");
      del.sync(PLI.DEPLOY_TEST_HTML);
      await copyTargetTestHTML(PLI.DEPLOY);
      resolve();
    });
  });
}
