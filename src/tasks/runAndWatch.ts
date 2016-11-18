import * as nodemon from "gulp-nodemon";
import {dirname} from "path";

export function runAndWatch({
  script,
  production,
  watch
}) {
  nodemon({
    script,
    ext: 'js',
    delay: 200,
    watch: watch ? (Array.isArray(watch) ? watch : [watch]) : [dirname(script)],
    execMap: {
      js: `node --debug=${5858}`
    },
    env: {
      NODE_ENV: production ? 'production' : 'development'
    }
  });
}