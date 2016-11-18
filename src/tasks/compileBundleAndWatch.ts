import {getCompilePaths} from "bigg-typescript/src/utils/getCompilePaths";
import {compileAndBundle} from "./compileAndBundle";
import {watch, series} from "gulp";
import {log} from "gulp-util";
import {promisify} from "../utils/promisify";

export function compileBundleAndWatch(options) {
  options = Object.assign({
    compile: {},
    bundle: {}
  }, options);

  const boundCompileAndBundle = () => {
    return compileAndBundle(options)
      .then(() => log('==== Watching for changes... ===='));
  };

  return promisify(series(
    boundCompileAndBundle,
    () => {
      return watch(getCompilePaths(options.compile.compilePaths), {
        interval: 1000,
        usePolling: true
      }, boundCompileAndBundle)
        .on('change', () => {
          log('=== Source change detected. Recompiling...');
        });
    }));
}