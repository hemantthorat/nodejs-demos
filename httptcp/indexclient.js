<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('httpServer', function (data) {
    console.log(data);
    document.write(data + "\r\n");
    socket.emit('tcp', "For TCP");
  });
</script>
