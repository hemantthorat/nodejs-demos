
var server = require('http').createServer().listen(8080);
var io = require('socket.io').listen(server);

/*
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
*/

io.sockets.on('connection', function (socket) {
  socket.on('callback', function (message, callback) {
    callback(message+'woot');
  });
  
  socket.broadcast.emit('user_notification_broadcast','new user connected');
  
  socket.emit('news', { news1: 'Hello world ' });
  socket.on('news_ack', function (data) {
    console.log(data);
  });

  io.sockets.emit('server_broadcast', { servernews1: 'Server Broadcast'});

  socket.on('private_message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });
  
  socket.on('set_name', function (name) {
    socket.set('name', name, function () {
      socket.emit('ready');
    });
  });

  socket.on('msg', function () {
    socket.get('name', function (err, name) {
      console.log('Chat message by ', name);
    });
  });
  
  var push = setInterval(function () {
      socket.volatile.emit('push_process', process.memoryUsage());
  }, 5000);

  socket.on('message', function (data) { 
    socket.send("welcome client");
    console.log(data);
  });

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
    clearInterval(push);
  });	
});
