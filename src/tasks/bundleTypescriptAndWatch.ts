import webpack = require('webpack');
import {log} from "util";

const config = require('../../assets/dev.webpack.config');

export function bundleTypescriptAndWatch({entries}) {
  const webpackEntry = {};

  entries.forEach((entry) => {
    webpackEntry['build/' + entry.name + '/bundle'] = entry.src;
  });

  config.entry = webpackEntry;

  const compiler = webpack(config);

  console.log();
  log('------------------------------------------');
  log(`===> Starting compilation and bundling... `);
  log('------------------------------------------');

  let startTime = new Date().getTime();

  compiler['plugin']('invalid', () => {
    log('==== Change detected. Compiling... =====');
    startTime = new Date().getTime();
  });

  compiler.watch({
    poll: true
  }, (err, stats) => {
    if (err) {
      console.error('Failed to create a production build. Reason:');
      console.error(err.message || err);
      process.exit(1);
    }

    console.log(stats.toString({
      chunks: false,
      colors: true
    }));

    const completionTime = Math.round((new Date().getTime() - startTime) / 1000 * 100) / 100;
    log('------------------------------------------');
    log(`=== Compilation and bundling completed in ${completionTime} sec.`);
    log('------------------------------------------');
    log('===== Waiting for changes... ======')
  })
}