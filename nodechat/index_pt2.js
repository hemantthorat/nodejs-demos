// Grab the modules we'll be using
var http = require('http');
var fs = require('fs');

// Sends the client html file
// The file is cached after the first time it's been read
function sendClientHtml(response) {
	if (sendClientHtml.cachedHtml) {
		response.writeHead(200, {'Content-Type': 'text/html', 'Transfer-Encoding': 'chunked'});
		response.write(sendClientHtml.cachedHtml);
		response.end();
	} else {
		fs.readFile('client.html', function(err, data) {
			sendClientHtml.cachedHtml = data;
			sendClientHtml(response);
		});
	}
}

// Create the server and listen
http.createServer(function(request, response) {
	if (request.url == '/') {
		sendClientHtml(response);
	}
}).listen(1337, "127.0.0.1");



