const path = require('path');
const appJson = require('../package.json');
const { app } = appJson;

module.exports = {
  mode: 'production',
  entry: `./src/${app}/index.js`,
  output: {
    publicPath: '/',
    path: path.join(__dirname, `../public/${app}`),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
