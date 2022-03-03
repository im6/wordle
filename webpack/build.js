const { baseConfig } = require("./base");

const newConfig = Object.assign(baseConfig, {
  mode: "production",
});

module.exports = newConfig;
