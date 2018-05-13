"use strict";

const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const PLI = require('@superflycss/pli');
const log = require('node-pretty-log');

const PROJECT_TYPE_COMPONENT = 'c';
const PROJECT_TYPE_UTILITY = 'u';
const PROJECT_TYPE_APP = 'a';
const PROJECT_TYPE_PROTOTYPE = 'p';

module.exports = (cli) => {

    cli.
        command('new <name>').
        alias('n').
        description('Create a new project').
        action((name) => {            
            if (cli.type == PROJECT_TYPE_COMPONENT) {
                log('info', 'Creating a component project');

                log('info', 'Creating directories...')
                mkdirp.sync(`${name}/${PLI.src.main.css}`);
                mkdirp.sync(`${name}/${PLI.src.test.css}`);
                mkdirp.sync(`${name}/${PLI.src.test.html}`);
                log('info', 'Writing project files');
                fs.writeFileSync(`./${name}/package.json`, 
                require('../generators/package-json')(name));
                fs.writeFileSync(`./${name}/.gitignore`, 
                require('../generators/gitignore'));
                fs.writeFileSync(`./${name}/${PLI.src.test.html}/index.html`, 
                require('../generators/test-index-html')(name));
                fs.writeFileSync(`./${name}/${PLI.src.test.css}/index.css`, 
                require('../generators/test-index-css')());
                fs.writeFileSync(`./${name}/${PLI.src.main.css}/index.css`, 
                require('../generators/main-index-css')());
            }
            else if (cli.type == PROJECT_TYPE_UTILITY) {
                log('info', 'Creating utility project');
            }
            else if (cli.type == PROJECT_TYPE_APP) {
                log('info', 'Creating app project');
            }
            else {
                log('info', 'Creating prototyping project');
                log('info', 'Creating directories...')
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
            }
        });
}