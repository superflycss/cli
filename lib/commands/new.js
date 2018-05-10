"use strict";

const generatePackageJson = require('../generators/package-json');
const generateTestHtml = require('../generators/test-index-html');
const generateGitignore = require('../generators/gitignore');
const generateTestCss = require('../generators/test-index-css');
const generateMainCss = require('../generators/main-index-css');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const PLI = require('@superflycss/pli');

module.exports = (cli) => {
    cli.
    command('new <name>').
    alias('n').
    description('Create a new project').
    action((name) => {
        mkdirp.sync(`${name}/${PLI.src.main.css}`);
        mkdirp.sync(`${name}/${PLI.src.test.css}`);
        mkdirp.sync(`${name}/${PLI.src.main.html}`);
        mkdirp.sync(`${name}/${PLI.src.test.html}`);
        mkdirp.sync(`${name}/${PLI.src.main.js}`);
        mkdirp.sync(`${name}/${PLI.src.test.js}`);
        fs.writeFileSync(`./${name}/package.json`, generatePackageJson(name));
        fs.writeFileSync(`./${name}/.gitignore`, generateGitignore());
        fs.writeFileSync(`./${name}/${PLI.src.test.html}/index.html`, generateTestHtml(name));
        fs.writeFileSync(`./${name}/${PLI.src.test.css}/index.css`, generateTestCss());
        fs.writeFileSync(`./${name}/${PLI.src.main.css}/index.css`, generateMainCss());
    });
}