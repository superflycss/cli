"use strict";

const PLI = require("@superflycss/pli");
const gaze = require("gaze");
const log = require("node-pretty-log");
const del = require("del");
const btc = require('./build/btc');
const bth = require('./build/bth');
const bs = require("browser-sync").create();
const copySrcTestSVG = require("../utilities/copysrctestsvg");
const copyTargetTestHTML = require("./serve/copyTargetTestHTML");
const copyTargetTestCSS = require("./serve/copyTargetTestCSS");
const runTargetBuild = require('./build').runBuild;

function startbs() {
  log("info", "Starting browsersync");
  bs.init({ server: PLI.SERVE });
  gazeMainCss(bs);
  gazeTestCss(bs);
  gazeTestHtml(bs);
  gazeTestNjk(bs);
}

module.exports = cli => {
  cli
    .command("serve")
    .alias("s")
    .description("Compile and serve test md, svg, css and test html")
    .action(name => {
      runBuild().then(()=>startbs());
    });
}

function runBuild() {
  return new Promise( async (resolve) => {
    runTargetBuild().then(async ()=>{
      log('info', 'Deleting serve/svg/**/*.svg');
      del.sync(PLI.SERVE_TEST_SVG);
      log('info', 'Copying src/test/svg/**/*.svg to serve/svg/');
      copySrcTestSVG(PLI.serve.svg);
      del.sync(PLI.SERVE_TEST_CSS);
      copyTargetTestCSS(PLI.serve.css);
      del.sync(PLI.SERVE_TEST_HTML);
      copyTargetTestHTML(PLI.SERVE);  
      resolve();
    });
  });
}

function gazeMainCss(bs) {
  gaze(PLI.SRC_MAIN_CSS, (err, watcher) => {
    if (err) {
      log("error", "Error buliding src/main/css content.");
      throw new Error(err);
    }

    /**
     * Triggered both when new files are added and when files are changed.
     */
    watcher.on("changed", function(filepath) {
      btc().then(() => {
        del(PLI.SERVE_TEST_CSS);
        copyTargetTestCSS(PLI.serve.css).
        then(()=>{bs.reload("*.css")});
        
      });
    });
  });
}

function gazeTestCss(bs) {
  gaze(PLI.SRC_TEST_CSS, (err, watcher) => {
    if (err) {
      log("error", "Error buliding src/test/css/ content.");
      throw new Error(err);
    }

    /**
     * Triggered both when new files are added and when files are changed.
     */
    watcher.on("changed", function(filepath) {
      btc().then(() => {
        del(PLI.SERVE_TEST_CSS);
        copyTargetTestCSS(PLI.serve.css).
        then(()=>{bs.reload("*.css")});
      });
    });
  });
}

function gazeTestHtml(bs) {
  gaze(PLI.SRC_TEST_HTML, (err, watcher) => {
    if (err) {
      log("error", "Error buliding src/test/html content.");
      throw new Error(err);
    }

    /**
     * Triggered both when new files are added and when files are changed.
     */
    watcher.on("changed", function(filepath) {      
      bth().then(() => {
        del(PLI.SERVE_TEST_HTML);
        copyTargetTestHTML(PLI.SERVE).
        then(()=>{bs.reload("*.html")});
      });
    });
  });
}

function gazeTestNjk(bs) {
  gaze(PLI.SRC_TEST_NJK, (err, watcher) => {
    if (err) {
      log("error", "Error buliding src/test/html content.");
      throw new Error(err);
    }

    /**
     * Triggered both when new files are added and when files are changed.
     */
    watcher.on("changed", function(filepath) {
      bth().then(() => {
        del(PLI.SERVE_TEST_HTML);
        copyTargetTestHTML(PLI.SERVE).
        then(()=>{bs.reload("*.html")});
      });
    });
  });
}