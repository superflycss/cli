"use strict";

const PLI = require('@superflycss/pli');
const rsync = require('recursive-copy');

module.exports = function copyTestSVG() {
    rsync(PLI.src.test.svg, PLI.target.test.svg, function (error, results) {
        if (error) {
            console.error('Serving svg failed: ' + error);
        }
    });
} 