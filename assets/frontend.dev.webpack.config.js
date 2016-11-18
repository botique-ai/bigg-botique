var path = require('path');
const fs = require('fs');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const node_modules = fs.readdirSync('node_modules').filter(x => x !== '.bin');

module.exports = function frontendConfig(indexFile, favIcon, name, script, rootUrl) {
  return {
    devtool: 'module-source-map',
    entry: {
      dev: require.resolve('webpack-dev-server/client') + '?' + rootUrl,
      host: require.resolve('webpack/hot/dev-server') + '?overlay=true',
      ['build/' + name + '/bundle']: script
    },
    output: {
      // Next line is not used in dev but WebpackDevServer crashes without it:
      path: path.resolve('./'),
      pathinfo: true,
      filename: '[name].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['', '.ts', '.tsx', '.js']
    },
    // externals: [
    //   node_modules
    // ],
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
          test: /\.css$/,
          loader: 'style!css!postcss'
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
          loader: 'file',
        },
        {
          test: /\.(mp4|webm)$/,
          loader: 'url?limit=10000'
        }
      ]
    },
    ts: {
      transpileOnly: true,
      compilerOptions: {
        target: 'es5',
        isolatedModules: true
      }
    },
    postcss: function () {
      return [autoprefixer];
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(indexFile),
        favicon: path.resolve(favIcon),
      }),
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
      // Note: only CSS is currently hot reloaded
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};
