var express = require('express');
var wsio = require('websocket.io');

var app = express.createServer();
var ws = wsio.attach(app);


app.use(express.static('public'));

ws.on('connection', function(socket) {
	socket.on('message', function(msg) {
		console.log('\33[96mgot: \033[39m' + msg);
		socket.send('ping');
	})
});

app.listen(3000);
