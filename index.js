'use strict';

const gulp = require('gulp');
const path = require('path');
const install = require('gulp-install');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const http = require('http');
const gulpFilter = require('gulp-filter');
const mocha = require('gulp-spawn-mocha');
const sourcemaps = require('gulp-sourcemaps');
const jeditor = require("gulp-json-editor");
const gutil = require('gulp-util');
const _ = require('lodash');

const tsProject = ts.createProject(path.join(__dirname, 'tsconfig.json'), {
  typescript: require('typescript')
});

function installDeps() {
  return gulp.src('package.json')
    .pipe(jeditor((json) => {
      if (json.dependencies) {
        json.dependencies['source-map-support'] = '0.4.0';
      }

      else {
        json.dependencies = {'source-map-support': '0.4.0'};
      }
      return json;
    }))
    .pipe(gulp.dest('.'))
    .pipe(install({
      args: '--progress=false'
    }));
}
module.exports.install = installDeps;

function compileTs() {
  gutil.log('===> Starting typescript compilation....');

  const tsResult = gulp.src([
    'src/**/*.ts',
    'typings/**/*.d.ts'
  ])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));


  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .on('end', () => {
      gutil.log('<=== Typescript source compiling finished.');
    });
}
module.exports.compile = compileTs;

function compileTests() {
  gutil.log('===> Starting typescript tests compilation....');

  const tsResult = gulp.src([
    'test/**/*.ts',
    'typings/**/*.d.ts'
  ])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));


  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/test'))
    .on('end', () => {
      gutil.log('<=== Typescript tests source compiling finished.');
    });
}
module.exports['compile-tests'] = compileTests;

function runIntegrationTests({ reporter, reportFilePath}) {
  return gulp.src('./dist/test/**/*.spec.js')
    .pipe(mocha({
      reporter,
      p: reportFilePath,
    }))
    .on('error', function(err) {
      gutil.log('Integration tests failed. ' + err.message);
    });
}
module.exports['run-integration-tests'] = runIntegrationTests;

function runTests() {
  return gulp.src('./dist/js/**/*')
    .pipe(gulpFilter(['**/*.spec.js']))
    .pipe(mocha())
    .pipe(gulp.dest('../.build/coverage/reports'));
}
module.exports.test = gulp.series(installDeps, compileTs, runTests);

function watchCompile() {
  gulp.watch(['src/**/*', 'typings/**/*'], {interval: 1000, usePolling: true}, compileTs)
    .on('change', () => {
      gutil.log('=== Source change detected. Recompiling....');
    });
  gulp.watch(['test/**/*', 'typings/**/*'], {interval: 1000, usePolling: true}, compileTests)
    .on('change', () => {
      gutil.log('=== Tests source change detected. Recompiling....');
    });
}
module.exports['compile-watch'] = gulp.series(compileTs, watchCompile);

function watchIntegrationTests(argv) {
  gulp.watch(['dist/js/**/*', 'dist/test/**/*'], {interval: 1000, usePolling: true}, runIntegrationTests.bind(undefined, argv));
}
module.exports['watch-integration-tests'] = (argv) => gulp.series(runIntegrationTests.bind(undefined, argv), watchIntegrationTests.bind(undefined, argv))();

function runWatch({script, watch, delay, ext, env, debugPort, nodeEnv}) {
  nodemon({
    script: script || 'dist/js/index.js',
    watch: watch || 'dist/js',
    delay: delay || 100,
    ext: ext || 'js',
    execMap: {
      js: `node --debug=${debugPort || 5858}`
    },
    env: _.extend({
      NODE_ENV: nodeEnv || 'development'
    }, env)
  });
}

module.exports['run-watch'] = runWatch;
