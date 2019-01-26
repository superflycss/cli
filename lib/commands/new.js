"use strict";

const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const PLI = require('@superflycss/pli');
const log = require('node-pretty-log');

const PROJECT_TYPE_COMPONENT = 'c';
const PROJECT_TYPE_UTILITY = 'u';
const PROJECT_TYPE_APP = 'a';
const PROJECT_TYPE_EMPTY = 'e';
const PROJECT_TYPE_PROTOTYPE = 'p';

module.exports = (cli) => {
    cli.
        command('new <name>').
        alias('n').
        description('Create a new project').
        action((name) => {

            const maincssdir = path.join(name, PLI.src.main.css);
            const mainsssdir = path.join(name, PLI.src.main.sss);
            const mainhtmldir = path.join(name, PLI.src.main.html);
            const testcssdir = path.join(name, PLI.src.test.css);
            const testsssdir = path.join(name, PLI.src.test.sss);
            const testhtmldir = path.join(name, PLI.src.test.html);
                        
            switch(cli.type) {
                case PROJECT_TYPE_COMPONENT: 
                log('info', 'Creating a component project');
                log('info', 'Creating directories with defalt content...')
                mkdirp.sync(maincssdir);
                mkdirp.sync(testcssdir);
                mkdirp.sync(testhtmldir);
                log('info', 'Writing project files');
                fs.writeFileSync(`./${name}/package.json`, 
                require('../generators/package-json')(name));
                fs.writeFileSync(`./${name}/.gitignore`, 
                require('../generators/gitignore'));
                fs.writeFileSync(`${testhtmldir}/index.html`, 
                require('../generators/test-index-html')(name));
                fs.writeFileSync(`./${testcssdir}/index.css`, 
                require('../generators/test-index-css')());
                fs.writeFileSync(`./${maincssdir}/index.css`, 
                require('../generators/main-index-css')());
                break;
                case PROJECT_TYPE_UTILITY:
                log('info', 'Creating utility project');
                break;

                case PROJECT_TYPE_EMPTY:
                log('info', 'Creating empty project');
                mkdirp.sync(mainsssdir);
                mkdirp.sync(testsssdir);
                mkdirp.sync(maincssdir);
                mkdirp.sync(testcssdir);
                mkdirp.sync(mainhtmldir);
                mkdirp.sync(testhtmldir);
                break;
                case PROJECT_TYPE_APP: 
                log('info', 'Creating app project');
                break;
                default:
                log('info', 'Creating prototyping project');
                log('info', 'Creating directories with default content...')
                mkdirp.sync(`${name}/${PLI.src.main.css}`);
                mkdirp.sync(`${name}/${PLI.src.test.css}`);
                mkdirp.sync(`${name}/${PLI.src.test.html}`);
                log('info', 'Writing starter files ...')
                fs.writeFileSync(`./${name}/package.json`,
                    require('../generators/prototype/package-json')());
                fs.writeFileSync(`./${name}/${PLI.src.test.html}/index.html`,
                    require('../generators/prototype/test-index-html')());
                fs.writeFileSync(`./${name}/${PLI.src.test.css}/index.css`,
                    require('../generators/prototype/test-index-css')());
                fs.writeFileSync(`./${name}/${PLI.src.main.css}/index.css`,
                    require('../generators/prototype/main-index-css')());
                break;
            } 
        });
}