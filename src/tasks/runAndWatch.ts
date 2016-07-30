import * as nodemon from "gulp-nodemon";
import {extend} from "lodash";

export default function runAndWatch({
  name
}) {
  nodemon({
    script: `./build/${name}/bundle.js`,
    ext: 'js',
    execMap: {
      js: `node --debug=${5858}`
    },
    env: extend({
      NODE_ENV: 'development'
    }) as any
  });
}