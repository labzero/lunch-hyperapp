const config = require('./webpack.config.js');

module.exports = config({
  devtool: 'inline-source-map',
  mode: 'development',
  tsconfig: 'tsconfig.dev.json',
});
