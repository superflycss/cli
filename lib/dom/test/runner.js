"use strict";

const nunjucks = require('nunjucks');
const highlight = require('highlight.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = (html)=> {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    document.querySelectorAll('.TestMarkup > code').forEach((node) => {
        var markup = node.innerHTML;
        var testDescriptionNode =
            node.parentElement.
            parentElement.
            nextElementSibling.querySelector('.TestDescription');
        var renderTestBlock = document.createElement('div');
        renderTestBlock.innerHTML = markup;
        renderTestBlock.setAttribute('class', "TestRender");
        insertAfter(testDescriptionNode, renderTestBlock);
    });

    let rendered = nunjucks.renderString(dom.serialize());

    const dom2 = new JSDOM(rendered);
    const document2 = dom2.window.document;

    document2.querySelectorAll('.TestMarkup > code').forEach((node) => {
        var markup = node.innerHTML;
        node.innerHTML = highlight.highlight('html', markup).value;
    });
    return dom2;
}

/** Insert the new node after the reference node's next sibling.
 * @param referenceNode the reference node
 * @param newNode the new node
 */
const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}