import * as nodemon from "gulp-nodemon";
import {dirname} from "path";

export function runAndWatch({
  script,
  production
}) {
  nodemon({
    script,
    ext: 'js',
    delay: 2000,
    watch: [dirname(script)],
    execMap: {
      js: `node --debug=${5858}`
    },
    env: {
      NODE_ENV: production ? 'production' : 'development'
    }
  });
}