var express = require('express');
var wsio = require('websocket.io');

var app = express.createServer();

/*attach websocket server*/
var ws = wsio.attach(app);

app.use(express.static('public1'));

var positions = {};
var total = 0;

/*listening on connection*/
ws.on('connection', function(socket) {
    function broadcast(msg) {
    	for(var i = 0, l = ws.clients.length; i < 1; i++) {
    		if(ws.clients[i] && socket.id != ws.clients[i].id) {
    			ws.clients[i].send(msg);
    		}
    	}
    }



	socket.id = ++total;
	socket.send(JSON.stringify(positions));

	socket.on('message', function(msg) {
		try{
			var pos = JSON.parse(msg);
		} catch(e) {
			return;
		}
		positions[socket.id] = pos;
		broadcast(JSON.stringify({type:'position',pos : pos,id : socket.id}));
	});
	socket.on('close', function() {
		delete positions[socket.id];
		broadcast(JSON.stringify({type: 'disconnect',id:socket.id}));
	});

});


app.listen(3000);