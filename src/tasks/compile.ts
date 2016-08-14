import webpack = require("webpack");
const uuid = require('node-uuid');
const config = require('../../assets/dev.webpack.config');

export default function compile({_}) {
  return new Promise((resolve, reject) => {
    const outputId = uuid.v4();

    config.entry = [_[1]];
    config.output.filename = `./build/tmp/${outputId}.js`;

    webpack(config, (err, stats) => {
      if (err) {
        console.error('Failed to create a production build. Reason:');
        console.error(err.message || err);
        reject(err);
      }

      if (stats.hasErrors()) {
        console.log(stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true
        }));
      }
      else if (stats.hasWarnings()) {
        console.log(stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true
        }));
      }

      console.log('Compiled successfully.');
      resolve(config.output.filename);
    });
  });
}