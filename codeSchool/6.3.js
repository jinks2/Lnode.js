var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index3.html');
});

io.on('connection', function (client) {
  var nickname;
	client.on("join",function(name) {
		nickname = name;
		client.emit("ready-name");
	});

  client.on('sentMsg', function (data) {
  	console.log(data);
  	client.broadcast.emit("returnMsg",nickname + ":" +data);
  });

});

console.log("it work");
