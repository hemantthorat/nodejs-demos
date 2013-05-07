// Grab the modules we'll be using
var http = require('http');
var fs = require('fs');
var url = require('url');

// Global array of clients listening to the chat. Each item
// in the array is { response: responseObject, auth: userName }
var clients = [];	// in form {response:, auth:}

// If the auth matches an existing client, return the index to that client
// If not, create a new client and return that index
function getOrCreateClient(auth) {
	for (var i in clients) {
		if (clients[i].auth === auth) {
			return i;
		}
	}
	
	var newClient = {'response': null, 'auth': auth};
	clients.push(newClient);
	return clients.length - 1;
}

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
		var clientIndex = getOrCreateClient(urlObj.query.user, response);
		console.log("client:" + clientIndex + ", url:" + request.url);
	
		switch (urlObj.pathname) {
			case '/listen':
				// Cache the response object 
				clients[clientIndex].response = response;

				// Setup our chunked respone
				response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8', 'Transfer-Encoding': 'chunked'} );
				break;
		
			case '/addText':
				// For new text, we'll do something very simple and just
				// push it to all the clients we know about
				if (urlObj.query.text) {
					for (var i in clients) {
						if (clients[i].response) {
							clients[i].response.write('<script type="text/javascript">parent.addText("' + clients[clientIndex].auth + '", "' + urlObj.query.text + '");</script>');
						}
					}
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



