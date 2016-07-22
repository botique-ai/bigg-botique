import {log} from "gulp-util";
import {watch, series} from "gulp";
import {compilePaths, default as compile} from "./compile";

export function watchCompile() {
  watch(compilePaths, {interval: 1000, usePolling: true}, compile)
    .on('change', () => {
      log('=== Source change detected. Recompiling....');
    });
}

export const compileAndWatch = series(compile, watchCompile);