// Grab the modules we'll be using
var http = require('http');
var fs = require('fs');
var url = require('url');

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
	} else {

		// Get the client index based on the URL querystring
		var urlObj = url.parse(request.url, true)
		switch (urlObj.pathname) {
			case '/addText':
				// For new text, we'll do something very simple and just
				// dump it out to the console
				if (urlObj.query.text) {
					console.log(urlObj.query.user + '>\t' + urlObj.query.text)
				}
		
			default:
				// Handle mystery URL
				response.writeHead(200, { 'Content-Type': 'text/plain'} );
				response.write('dunno this url: "' + request.url + '"');	
				response.end();
				break;
		}
	}
}).listen(1337, "127.0.0.1");



