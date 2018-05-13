#!/usr/bin/env node

"use strict";
const cli = require('commander');


//Commands
require('./lib/commands/new')(cli);
require('./lib/commands/clean')(cli);
require('./lib/commands/buildmaincss')(cli);
require('./lib/commands/buildtestcss')(cli);
require('./lib/commands/buildtesthtml')(cli);
require('./lib/commands/build')(cli);
require('./lib/commands/dist')(cli);
require('./lib/commands/serve')(cli);

cli.
    version('1.0.0').
    description('SuperflyCSS Command Line Interface').
    option("-t, --type [type]").
    parse(process.argv);