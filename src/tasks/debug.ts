import {fork} from "child_process";

export default function debug({_, webPort = "8888"}:{_:Array<any>; webPort?:string}) {
  var inspectorArgs = [`--web-port=${webPort}`].concat(_.slice(1));
  var inspector = fork(
    require.resolve('node-inspector/bin/inspector'),
    inspectorArgs
  );

  inspector.on('message', handleInspectorMessage);

  function handleInspectorMessage(msg) {
    switch (msg.event) {
      case 'SERVER.LISTENING':
        console.log('Visit %s to start debugging.', msg.address.url);
        break;
      case 'SERVER.ERROR':
        console.log('Cannot start the server: %s.', msg.error.code);
        break;
    }
  }
}