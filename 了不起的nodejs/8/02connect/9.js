var connect = require('connect');
var fs = require('fs');
var server = connect(connect.cookieParser());

server.use(function(req, res ,next) {
	console.log(typeof req.cookies);
})

server.listen(3000);