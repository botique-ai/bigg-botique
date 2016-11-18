import {compileAndWatch} from "bigg-typescript/src/tasks/compileAndWatch";
import {compile as originalCompile} from "bigg-typescript";

export = {
  biggs: [
    'bigg-typescript',
    function compile() {
      return originalCompile({
        declarations: true
      });
    },
    function develop() {
      return compileAndWatch({
        declarations: true
      });
    }
  ],
  defaultTask: 'develop'
}