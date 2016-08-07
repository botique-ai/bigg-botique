import {parallel} from "gulp";
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
  default as compileAndRun
} from "./tasks/compileAndRun";

export {
  default as debug
} from "./tasks/debug";

export {
  default as runFrontendAndWatch
} from "./tasks/runFrontendAndWatch";

export const compileRunAndWatch = (args) =>
  parallel(() => watchCompile(args), () => runAndWatch(args))();