"use strict";

const PLI = require('@superflycss/pli');
const nunjucks = require('nunjucks');
nunjucks.configure([PLI.NODE_MODULES, PLI.src.main.njk, PLI.src.test.njk]);
const highlight = require('highlight.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = (html)=> {
    let rendered = nunjucks.renderString(html);

    const dom = new JSDOM(rendered);
    const document2 = dom.window.document;

    document2.querySelectorAll('.TestMarkup > code').forEach((node) => {
        var markup = node.innerHTML;
        node.innerHTML = highlight.highlight('html', markup).value;
    });
    return dom;
}