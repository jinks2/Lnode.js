var http = require('http');
var serv = http.createServer(function(req,res) {
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end('<marquee>Smashing Node!</marquee>')
});
console.log('start');
serv.listen(3000);