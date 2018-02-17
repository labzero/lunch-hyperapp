const webpack = require('webpack');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (options) => ({
  context: path.resolve(__dirname, "../"),
  devtool: options.devtool,
  entry: './src/index.tsx',
  mode: options.mode,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, options.tsconfig),
          transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
        },
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new CopyWebpackPlugin(['static']),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, options.tsconfig),
    }),
    new webpack.DefinePlugin({
      'process.env.CORS': JSON.stringify(options.mode === 'development'),
      'process.env.HELLO_WORLD': 'yeah',
    }),
  ],
});

