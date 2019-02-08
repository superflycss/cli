"use strict";

const fs = require("fs-extra");
const log = require("node-pretty-log");
const PLI = require("@superflycss/pli");
const postcss = require("postcss");
const globby = require("globby");

const postcss_mqpacker = require("css-mqpacker")();
const postcss_cssnano = require("cssnano")({ preset: "default" });

const postcss_plugins = [postcss_mqpacker, postcss_cssnano];

exports.bmmc = () => {
  log("info", "Minifying target/main/css/**/*.css content.");
  return globby([PLI.TARGET_MAIN_CSS]).then(process);
};

exports.btmc = () => {
  log("info", "Minifying target/test/css/**/*.css content.");
  return globby([PLI.TARGET_TEST_CSS]).then(process);
};

/**
 * @function  [process] Load src css files, compile in parallel, and save the result
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
