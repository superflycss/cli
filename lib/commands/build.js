"use strict";

const log = require("node-pretty-log");
const PLI = require("@superflycss/pli");
const bmh = require("./build/bmh");
const bth = require("./build/bth");
const bmc = require("./build/bmc");
const btc = require("./build/btc");
const bms = require("./build/bms");
const bmfc = require("./filter/").bmfc;
const btfc = require("./filter").btfc;
const bmmc = require("./min/").bmmc;
const btmc = require("./min/").btmc;
const bmmd = require("./md/").bmmd;
const btmd = require("./md/").btmd;
const copySrcTestSVG = require("../utilities/copysrctestsvg");

function runBuild() {
    return new Promise((resolve)=>{
        return Promise.all([bmmd(), btmd()]).then(() => {
          log("info", "Completed build of src/main/md content");
          log("info", "Completed build of src/test/md content");
          Promise.all([copySrcTestSVG(PLI.target.test.svg), bmh(), bmc(), bms(), btc(), bth()]).then(() => {
            log("info", "Completed build of src/main/html content");
            log("info", "Completed build of src/main/css content");
            log("info", "Completed build of src/main/sss content");
            log("info", "Completed build of src/test/css content");
            log("info", "Completed build of src/test/html content");
            resolve();
          });
        });      
    });
}

module.exports.runBuild = runBuild;

module.exports.build = async cli => {
  cli
    .command("build")
    .alias("b")
    .description("Build main css, test css, and test html")
    .action(async name => {
      runBuild().then(()=>{
          log("info", "Build complete!")
        });
    });

  cli
    .command("build:main:md")
    .alias("bmmd")
    .description("Build main md)")
    .action(() => {
      bmmd().then(log("info", "Completed build of main md content"));
    });

  cli
    .command("build:test:md")
    .alias("btmd")
    .description("Build test md)")
    .action(() => {
      btmd().then(log("info", "Completed build of test md content"));
    });

  cli
    .command("build:main:css")
    .alias("bmc")
    .description("Build main css)")
    .action(() => {
      bmc().then(log("info", "Completed build of main css content"));
    });

  cli
    .command("build:test:css")
    .alias("btc")
    .description("Build Test CSS")
    .action(() => {
      btc().then(log("info", "Completed build of test css content"));
    });

  cli
    .command("build:main:html")
    .alias("bmh")
    .description("Build Main HTML")
    .action(() => {
      bmh().then(log("info", "Completed build of main html content"));
    });

  cli
    .command("build:test:html")
    .alias("bth")
    .description("Build Test HTML")
    .action(() => {
      bth().then(log("info", "Completed build of test html content"));
    });

  cli
    .command("build:main:filtered:css")
    .alias("bmfc")
    .description("Build Main Filtered CSS")
    .action(() => {
      bmfc().then(log("info", "Completed filtering of main css content"));
    });

  cli
    .command("build:test:filtered:css")
    .alias("btfc")
    .description("Build Test Filtered CSS")
    .action(() => {
      btfc().then(log("info", "Completed filtering of test css content"));
    });

  cli
    .command("build:main:minified:css")
    .alias("bmmc")
    .description("Build Main Minified CSS")
    .action(() => {
      bmmc().then(log("info", "Completed minification of test css content"));
    });

  cli
    .command("build:test:minified:css")
    .alias("btmc")
    .description("Build Test Minified CSS")
    .action(() => {
      btmc().then(log("info", "Completed minification of test css content"));
    });
};
