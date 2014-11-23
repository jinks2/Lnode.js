var http = require('http');
var qs = require('querystring');

function send(theName) {
	http.request({
		host: '127.0.0.1',
		port: 3000,
		url: '/',
		method: 'POST'
	}, function(res) {
		res.setEncoding('utf8');
	    console.log('\r\n \033[90m request complete!\033[39m');
		process.stdout.write('\r\n your name: ')
	
   }).end(qs.stringify({name: theName}));
}
process.stdout.write('\r\n your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(name) {
	send(name.replace('\r\n',''));
});


