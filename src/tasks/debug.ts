import {DebugServer} from 'node-inspector/lib/debug-server';
import Config = require('node-inspector/lib/config');

export default function debug({webPort}:{webPort?:number}) {
  var config = new Config([]);

  var debugServer = new DebugServer(config);

  debugServer.on('error', (err) => {

    if (err.code === 'EADDRINUSE') {
      console.error('There is another process already listening at this address.\nChange "webPort": {port} to use a different port.');
    }

    process.exit(1);
  });

  debugServer.on('listening', function () {
    console.log('Visit', this.address().url, 'to start debugging.');
  });

  debugServer.on('close', function () {
    process.exit();
  });

  debugServer.start(config);
}