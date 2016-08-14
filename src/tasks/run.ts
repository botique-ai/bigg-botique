import {fork} from "child_process";
import {resolve} from "path";

export default function run({_}) {
  console.log(`Running ${resolve(_[1])}...`);
  console.log();
  fork(
    resolve(_[1]),
    _.slice(2),
    {
      execArgv: _.slice(2)
    }
  );
}