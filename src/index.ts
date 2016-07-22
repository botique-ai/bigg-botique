import {parallel, series} from "gulp";
import {watchCompile} from "./tasks/watchCompile";
import compile from "./tasks/compile";
import runAndWatch from "./tasks/runAndWatch";

export {
  default as compile
} from "./tasks/compile";

export {
  compileAndWatch
} from "./tasks/watchCompile";

export {
  default as runAndWatch
} from "./tasks/runAndWatch";

export {
  default as installDeps
} from "./tasks/installDeps";

export const compileRunAndWatch = (args) =>
  series(compile, parallel(watchCompile, () => runAndWatch(args)))();