const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const fs = require('fs');

const node_modules = fs.readdirSync('node_modules').filter(x => x !== '.bin' );

module.exports = {
  devtool: 'cheap-module-source-map',
  target: 'node',
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: './',
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  externals: [
    node_modules
  ],
  resolveLoader: {
    root: path.resolve(path.join(__dirname, '../node_modules')),
    moduleTemplates: ['*-loader']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new ProgressBarPlugin({
      format: '  build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    })
  ]
};
