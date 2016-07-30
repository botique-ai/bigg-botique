import webpack = require('webpack');

const config = require('../../assets/dev.webpack.config');

export default function watchCompile({entries}) {
  const webpackEntry = {};

  entries.forEach((entry) => {
    webpackEntry['build/' + entry.name + '/bundle'] = entry.src;
  });

  config.entry = webpackEntry;

  const compiler = webpack(config);

  compiler['plugin']('invalid', () => {
    console.log('Change detected. Compiling...');
  });

  console.log();
  console.log('Starting initial compilation...');

  compiler.watch({}, (err, stats) => {
    if (err) {
      console.error('Failed to create a production build. Reason:');
      console.error(err.message || err);
      process.exit(1);
    }

    if (stats.hasErrors()) {
      console.log(stats.toString({
        chunks: false,
        colors: true
      }));
    }
    else if (stats.hasWarnings()) {
      console.log(stats.toString({
        chunks: false,
        colors: true
      }));
    }


    console.log('Compiled successfully. Keeping watch...');
    console.log();
  })
}