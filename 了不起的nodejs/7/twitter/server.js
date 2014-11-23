var http = require('http');
var qs = require('querystring');
http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('Hello World');
}).listen(3000);