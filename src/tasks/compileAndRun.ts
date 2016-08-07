import webpack = require('webpack');
const uuid = require('node-uuid');
const relative = require('require-relative');
import {exec} from "child_process";
import debug from "./debug";

const config = require('../../assets/dev.webpack.config');

export default function compileAndRun({_}) {
  const outputId = uuid.v4();

  config.entry = [_[1]];
  config.output.filename = `./build/tmp/${outputId}.js`;

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
    console.log('Running script...');

    const child = exec(`node --debug ${config.output.filename}`);

    child.stdout.on('data', (data) => {
      process.stdout.write('STDOUT: ' + data);
    });
    child.stderr.on('data', (data) => {
      process.stdout.write('STDERR: ' + data);
    });
    child.on('close', (code) => {
      process.stdout.write('closing code: ' + code);
    });

    exec(`node-inspector`);
  });
}