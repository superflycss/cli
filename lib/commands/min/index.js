"use strict";

const fs = require("fs-extra");
const log = require("node-pretty-log");
const PLI = require("@superflycss/pli");
const postcss = require("postcss");
const globby = require("globby");
const del = require('del');

const postcss_mqpacker = require("css-mqpacker")();
const postcss_cssnano = require("cssnano")({ preset: "default" });

const postcss_plugins = [postcss_mqpacker, postcss_cssnano];

const MAIN_FILTERED_CSS = require('../../constants').MAIN_FILTERED_CSS;
const TEST_FILTERED_CSS = require('../../constants').TEST_FILTERED_CSS;
const MAIN_MIN_CSS = require('../../constants').MAIN_MIN_CSS;
const TEST_MIN_CSS = require('../../constants').TEST_MIN_CSS;

exports.bmmc = () => {
  log("info", "Minifying target/main/css/**/*.min.css content.");
  del.sync(MAIN_MIN_CSS);
  log("info", "Minifying target/main/css/**/*.filtered.css content.");
  return globby([MAIN_FILTERED_CSS]).then(process);
};

exports.btmc = () => {
  log("info", "Deleting target/test/css/**/*.min.css content.");
  del.sync(TEST_MIN_CSS);
  log("info", "Minifying target/test/css/**/*.filtered.css content.");
  return globby([TEST_FILTERED_CSS]).then(process);
};

/**
 * Load src css files, compile in parallel, and save the minified result
 * @param paths An array containing all the paths we are processings
 * @return {Promise} A promise instance to facilitate calling the next function in the build chain
 */
function process(paths) {
  return Promise.all(
    paths.map(
      file =>
        new Promise(resolve => {
          fs.readFile(file, (err, css) => {
            let targetFile = file.replace(PLI.SRC, PLI.TARGET);

            postcss(postcss_plugins)
              .process(css, { from: file, to: targetFile })
              .then(result => {
                targetFile = targetFile.replace(/\.[^\.]+$/, ".min.css");
                fs.writeFileSync(targetFile, result.css);
                if (result.map)
                  fs.writeFileSync(targetFile + ".map", result.map);
                resolve();
              });
          });
        })
    )
  );
}
