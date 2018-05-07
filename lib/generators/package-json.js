module.exports = (name) => {
    return `
{
"name": "${name}",
"version": "1.0.0",
"description": "",
"main": "src/main/index.css",
"scripts": {
    "build": "sfc build:main:css",
    "test": "sfc build:main:css && build:test:css && test:css"
},
"keywords": [],
"license": "ISC",
"devDependencies": {
    "npm-check-updates": "^2.14.2",
    "@superflycss/foundation": "^2.0.1"
  }
}
`;
}

