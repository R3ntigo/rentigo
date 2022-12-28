const path = require('path');
const { merge } = require('webpack-merge');

module.exports = (config, context) => merge(config, {
  // use ./loaders/dto-adapter.loader.js
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: path.resolve(__dirname, './loaders/dto-adapter.loader.js'),
        exclude: /node_modules/,
      },
    ],
  },
});
