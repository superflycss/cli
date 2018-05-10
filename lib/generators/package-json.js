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
      "npm-check-updates": "^2.14.2",
      "@superflycss/foundation": "^2.0.0"
  }
}
`;
}

