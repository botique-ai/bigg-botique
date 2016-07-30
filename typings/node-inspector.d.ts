declare module "node-inspector/lib/debug-server" {
  import {EventEmitter} from "events";
  export class DebugServer extends EventEmitter {
    constructor(options);

    start(options);
  }
}

declare module "node-inspector/lib/config" {
  class Config {
    constructor(options);
  }

  export = Config;
}