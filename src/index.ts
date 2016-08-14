import {parallel, series} from "gulp";
import run from "./tasks/run";
import compile from "./tasks/compile";
import debug from "./tasks/debug";
import runAndWatch from "./tasks/runAndWatch";
import watchCompile from "./tasks/watchCompile";

export {
  compile,
  run,
  debug
};

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
  default as runFrontendAndWatch
} from "./tasks/runFrontendAndWatch";

export const compileAndRun = ({_}) => {
  compile({_})
    .then(outputPath => {
      run({_:['node', outputPath].concat(_.slice(2))});
    })
};

export const compileAndDebug = ({_}) => {
  compile({_})
    .then(outputPath => {
      run({_:['node', outputPath, '--debug-brk'].concat(_.slice(2))});
    })
};

export const compileRunAndWatch = (args) =>
  parallel(() => watchCompile(args), () => runAndWatch(args))();