var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/chat', function (req, res) {
  res.sendfile(__dirname + '/indexmulti.html');
});

app.get('/news', function (req, res) {
  res.sendfile(__dirname + '/indexmulti.html');
});


var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  })
  .on('',function(){});

var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });
