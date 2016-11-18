import {series} from "gulp";
import {compile} from "bigg-typescript";
import {bundle} from "bigg-bundle";
import {promisify} from "../utils/promisify";
import {log} from "gulp-util";

export function compileAndBundle(options) {
  let startTime = new Date();
  return promisify(series(
    compile.bind(undefined, options.compile || {}),
    bundle.bind(undefined, options.bundle || {}),
    (done) => {
      const completionTime = Math.round((new Date().getTime() - startTime.getTime()) / 1000 * 100) / 100;

      log('------------------------------------------');
      log(`=== Compilation and bundling completed in ${completionTime} sec.`);
      log('------------------------------------------');
      done();
    }
  ));
}