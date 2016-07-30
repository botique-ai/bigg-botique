import * as nodemon from "gulp-nodemon";

export default function runAndWatch({
  script,
  production
}) {
  nodemon({
    script,
    ext: 'js',
    execMap: {
      js: `node --debug=${5858}`
    },
    env: {
      NODE_ENV: production ? 'production' : 'development'
    }
  });
}