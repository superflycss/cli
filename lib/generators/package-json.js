module.exports = (name) => {
    return `
{
  "name": "${name}",
  "version": "1.0.0",
  "description": "${name} component",
  "main": "index.css",
  "keywords": ["css", "component"],
  "license": "MIT",
  "devDependencies": {
    "@superflycss/component-header": "^2.1.0",      
    "@superflycss/foundation": "^2.0.0",
    "npm-check-updates": "^2.14.2"
  }
}
`;
}

