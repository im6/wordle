const path = require("path");
const { baseConfig } = require("./base");

const newConfig = Object.assign(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "../docs"),
    },
    port: 3000,
    hot: true,
  },
});

module.exports = newConfig;
