var WebSocketServer = require('ws').Server;

wss = new WebSocketServer({port: 3232});
var connected = 0;
wss.on('connection', function(ws) {

	var id = setInterval(function() {
					    ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ });
					  }, 1000);
	
	ws.on('message', function(message) {

		console.log('server received: %s', message);
	});
	console.log("opened connection: "+ws.fd);
/*  for(var propertyName in ws) {
	console.log(propertyName+" - "+ws[propertyName]);
}*/
	connected++;
	ws.send('server connected'+connected);
	
});	
	wss.on('close', function() {
    		console.log('stopping client interval');
		console.log("closed connection: "+ws.id);
		connected--;
		clearInterval(id);
	});

