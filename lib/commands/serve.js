"use strict";

const stc = require("./serve/stc");
const sth = require("./serve/sth");
const PLI = require("@superflycss/pli");
const gaze = require("gaze");
const log = require("node-pretty-log");
const del = require("del");
const copyTestSVG = require('../utilities/copytestsvg');

module.exports = cli => {
  cli
    .command("serve")
    .alias("s")
    .description("Compile and serve main and test css and test html")
    .action(name => {
      log("Deleting serve/svg/");
      del(PLI.serve.svg);
      copyTestSVG(PLI.serve.svg);
      const startbs = () => {
        log("info", "Completed build of html test content");

        stc().then(() => {
          log("info", "Completed build of css test content");
          log("info", "Starting browsersync");
          var bs = require("browser-sync").create();
          bs.init({ server: PLI.SERVE });
          gazeMainCss(bs);
          gazeTestCss(bs);
          gazeTestHtml(bs);
        });
      };
      sth().then(startbs);
    });
};

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
      stc().then(() => {
        bs.reload("*.css");
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
      stc().then(() => {
        bs.reload("*.css");
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
      sth().then(() => {
        bs.reload("*.html");
      });
    });
  });

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
        sth().then(() => {
          bs.reload("*.html");
        });
      });
    });  
}
