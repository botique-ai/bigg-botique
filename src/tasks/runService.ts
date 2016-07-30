import webpack = require('webpack');

const config = require('../../assets/dev.webpack.config');

export default function runService({entry, name}) {
  config.entry = [entry];
  config.output.filename = name + '/bundle.js';
  webpack(config, (err, stats) => {
    if (err) {
      console.error('Failed to create a production build. Reason:');
      console.error(err.message || err);
      process.exit(1);
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
    console.log();
  });
}