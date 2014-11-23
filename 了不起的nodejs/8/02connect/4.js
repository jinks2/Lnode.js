var connect = require('connect');
var time = require('./3.2');
var server = connect.createServer();

server.use('/my-images', connect.static(__dirname + '/website/img'));

server.use('/js', connect.static(__dirname, {maxAge:10000}));

server.use(connect.static(__dirname, {hidden:true}));

server.use(function(req) {
	console.log(req.url);
});

server.listen(3000);