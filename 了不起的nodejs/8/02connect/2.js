var connect = require('connect');
var server = connect.createServer();
server.use(function(req, res, next) {
	console.log(' %s: %s ', req.method, req.url);  
	next();
});
server.use(function(req, res, next) {
	if('GET' === req.method && '/img' === req.url.substr(0,4)) {
		console.log('img');
	} else {
		next();
	}
});
server.use(function(req, res, next) {
	if('GET' === req.method && '/' === req.url) {
		console.log('index');
	} else {
		console.log('other');
		next();
	}
});
server.use(function(req, res, next) {
	res.writeHead(404);
	res.end('Not Found');
});

server.listen(3000);
