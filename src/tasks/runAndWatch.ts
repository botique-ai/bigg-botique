import * as nodemon from "gulp-nodemon";
import {extend} from "lodash";

export default function runAndWatch({
  script,
  watch,
  delay,
  ext,
  env,
  debugPort,
  nodeEnv
}) {
  nodemon({
    script: script || 'lib/index.js',
    watch: watch || 'lib',
    delay: delay || 100,
    ext: ext || 'js',
    execMap: {
      js: `node --debug=${debugPort || 5858}`
    },
    env: extend({
      NODE_ENV: nodeEnv || 'development'
    }, env) as any
  });
}