import {src, dest} from "gulp";
import {join} from "path";
import * as ts from "gulp-typescript";
import {CompilationStream} from "gulp-typescript";
import {log} from "gulp-util";
import * as sourcemaps from "gulp-sourcemaps";
import merge = require("merge2");

const tsProject = ts.createProject(join(__dirname, '../../assets/compile-tsconfig.json'), {
  typescript: require('typescript')
});

export const compilePaths = [
  'src/**/*.ts',
  'typings/**/*.d.ts'
];

export default function compile() {
  log('===> Starting typescript compilation....');

  const tsResult:CompilationStream = src(compilePaths)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject)) as CompilationStream;

  const jsFiles = tsResult.js
    .pipe(sourcemaps.write())
    .pipe(dest('lib/'))
    .on('error', (err) => {
      log('<=== Failed to compiler tests sources. ' + err.message);
    })
    .on('end', () => {
      log('<=== Typescript source compiling finished.');
    });

  const dtsFiles = tsResult.dts.pipe(dest('lib/'));

  return merge([ jsFiles, dtsFiles ]) as any;
}