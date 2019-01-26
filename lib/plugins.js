const PLI = require("@superflycss/pli");

module.exports = [
  require("postcss-import"),
  require("postcss-each"),
  require("postcss-for"),
  require("postcss-css-variables"),
  require("postcss-apply"),
  require("postcss-calc"),
  require("postcss-color-function"),
  require("postcss-conditionals"),
  require("postcss-custom-media"),
  require("postcss-font-magician"),
  require("autoprefixer"),
  require("postcss-reporter")({
    clearMessages: true
  })
];