"use strict";

const main_html = () => {
  return `<!DOCTYPE html>
<html lang="en" class="red">
{% include "index.md.html" %}
</html>
`;
};

const test_html = () => {
  return `<!DOCTYPE html>
    <html lang="en" class="red">
    </html>
   `;
};

const css = () => {
  return `.red { color: red; }
.blue { color: blue; }
`;
};
const sss = () => {
  return `.a
    color: red`;
};

const md = () => {
  return `# Header`;
};

const svg = () => {
  return `<svg></svg>`;
};

exports.main_html = main_html;
exports.test_html = test_html;
exports.css = css;
exports.sss = sss;
exports.md = md;
exports.svg = svg;