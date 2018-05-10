#!/usr/bin/env node

"use strict";

const log = require('node-pretty-log');
const rsync = require('recursive-copy');
const cpy = require('cpy');

const fs = require('fs-extra');
const del = require('del');
const mkdirp = require('mkdirp');
const PLI = require('@superflycss/pli');
const cli = require('commander');

cli.
    version('1.0.0').
    description('SuperflyCSS Command Line Interface');

//Commands
require('./lib/commands/new')(cli);
require('./lib/commands/clean')(cli);
require('./lib/commands/buildmaincss')(cli);
require('./lib/commands/buildtestcss')(cli);
require('./lib/commands/buildtesthtml')(cli);
require('./lib/commands/build')(cli);
require('./lib/commands/dist')(cli);
require('./lib/commands/serve')(cli);

cli.parse(process.argv);