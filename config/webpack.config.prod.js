const config = require('./webpack.config.js');

module.exports = config({
  mode: 'production',
  tsconfig: 'tsconfig.prod.json',
});
