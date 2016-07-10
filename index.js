'use strict';

const gulp = require('gulp');
const path = require('path');
const install = require('gulp-install');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const http = require('http');
const gulpFilter = require('gulp-filter');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const jeditor = require("gulp-json-editor");

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
  const tsResult = gulp.src([
    'src/**/*.ts',
    'typings/**/*.d.ts'
  ])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));


  return tsResult.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/js'));
}
module.exports.compile = compileTs;

function runTests() {
  return gulp.src('./dist/js/**/*')
    .pipe(gulpFilter(['**/*.spec.js']))
    .pipe(mocha())
    .pipe(gulp.dest('../.build/coverage/reports'));
}
module.exports.test = gulp.series(installDeps, compileTs, runTests);

function watchCompile() {
  gulp.watch('src/**/*', gulp.series(compileTs));
}
module.exports['compile-watch'] = gulp.series(compileTs, watchCompile);

function runWatch() {
  nodemon({
    script: 'dist/js/index.js',
    watch: 'dist/js',
    delay: 100,
    ext: 'js',
    env: {'NODE_ENV': 'development'}
  });
}

module.exports['run-watch'] = runWatch;