/*
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});*/

/*
// Mongo Demo

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { hello: 'world' });
  socket.on('mongo', function (data) {
    console.log(data);

    var mongodb = require('mongodb');
    var server = new mongodb.Server("127.0.0.1", 27017, {});
    new mongodb.Db('newwishberg', server, {}).open(function (error, client) {
      if (error) throw error;
      var collection = new mongodb.Collection(client, 'notifications');
      collection.find({}, {limit:10}).toArray(function(err, docs) {
        console.dir(docs);
	socket.emit('data',docs);
      });
    });

  });
});

*/



/*
// Redis demo 

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { hello: 'world' });
  socket.on('redis', function (data) {
    console.log(data);

    var redis = require("redis"),
        client = redis.createClient(6379, "127.0.0.1");

    client.on('connect',function(){
	console.log("redis client connected");
    });	
    client.on('error',function(error){
	console.log(error);
    });	
    client.set("name", "myname");

    // This will return a JavaScript String
    client.get("name", function (err, reply) {
        socket.emit("data",reply.toString()); 
	console.log(reply.toString()); // Will print `myname`
    });
  });
});

*/


// Mysql demo

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { hello: 'world' });
  socket.on('mysql', function (data) {
    console.log(data);

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  password : 'root',
	  database  : 'newwishberg'
	});

	connection.connect(function(error) {
		console.log(error)
	});

	connection.query('SELECT * FROM usersmaster LIMIT 0,1', function(error, rows) {
		if(error){
			console.log(error);
			return;
		}
		socket.emit("data",rows[0]);
		console.log(rows[0]);
		
	});

  });
});

