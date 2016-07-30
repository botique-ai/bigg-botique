import {parallel, series} from "gulp";
import compile from "./tasks/compile";
import runAndWatch from "./tasks/runAndWatch";
import watchCompile from "./tasks/watchCompile";

export {
  default as compile
} from "./tasks/compile";

export {
  default as compileAndWatch
} from "./tasks/watchCompile";

export {
  default as runAndWatch
} from "./tasks/runAndWatch";

export {
  default as installDeps
} from "./tasks/installDeps";

export {
  default as runService
} from "./tasks/runService";

export const compileRunAndWatch = (args) =>
  parallel(() => watchCompile(args), () => runAndWatch(args))();