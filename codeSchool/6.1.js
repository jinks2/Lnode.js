var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index2.html');
});

io.on('connection', function (client) {
  client.emit('news', { hello: 'world' });
  client.on('message', function (data) {
    console.log(data);
  });
});


console.log("socket start");
