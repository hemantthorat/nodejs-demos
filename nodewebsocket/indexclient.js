
var WebSocket = require('ws');

ws = new WebSocket('ws://localhost:3232/');

ws.on('open', function() {

	ws.send('Client Connected');

});

ws.on('message', function(message) {

	console.log('Client received: %s', message);

});

