var http = require('http');
http.request({     //初始化一个http.Client Request对象
	host: '127.0.0.1',
	port: 3000,
	url: '/',
	method: 'get'
}, function(res) {
	var body = '';
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		body += chunk;
	});
	res.on('end', function() {
		console.log('\r\n We got: \033[96m' + body + '\033[39m\r\n');
	});
}).end();