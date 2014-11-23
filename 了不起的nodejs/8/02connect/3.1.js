var connect = require('connect');
var time = require('./3.2');
var server = connect();//.connect.createServer();
/*
记录请求情况
*/
server.use(connect.logger('dev'));
/*
实现时间中间件
*/
server.use(time({time: 500}));
/*
快速响应
*/
server.use(function(req, res, next) {
	if('/a' === req.url) {
		res.writeHead(200);
		res.end('Fast!');
	} else {
		next();
	}
});
/*
慢速响应
*/
server.use(function(req, res, next) {
	if('/b' === req.url) {
		setTimeout(function() {
			res.writeHead(200);
			res.end('slow');	
		}, 1000);
	} else {
		next();
	}
});

server.listen(3000);