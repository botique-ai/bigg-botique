import {src, dest} from "gulp";
import * as install from "gulp-install";

export function installDeps() {
  return src('package.json')
    .pipe(dest('.'))
    .pipe(install({
      args: '--progress=false'
    }));
}