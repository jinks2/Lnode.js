var express = require('express');
var sio = require('socket.io');

var app = express.createServer(express.bodyParser(), express.static('public'));

app.listen(3000);

//将socket.io绑定到app上;
var io = sio.listen(app);


//设置连接监听器;
io.sockets.on('connection', function(socket) {
	socket.on('join', function(name) {
		socket.nickname = name;
//如果使用socket.emit则只是将消息返回客户端；broadcastt是个消息标志，表示广播给所有用户
		socket.broadcast.emit('announcement', name + ' joined the chat.');
	});
	socket.on('text', function(msg,callback) {
		socket.broadcast.emit('text', socket.nickname, msg);
		callback('title'); //调用'text': socket.emit传来的回调方法；
	});
});
