import {compileAndWatch} from "bigg-typescript/src/tasks/compileAndWatch";

export = {
  biggs: [
    'bigg-typescript',
    function develop() {
      return compileAndWatch({
        declarations: true
      });
    }
  ],
  defaultTask: 'develop'
}