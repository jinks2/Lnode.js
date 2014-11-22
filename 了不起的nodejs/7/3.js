var http = require('http');
var fs = require('fs');
var stream;

http.createServer(function (req, res) {
	res.writeHead(200,{'Content-Type':'image/png'});
	stream = fs.createReadStream('1.png');
	stream.on('data', function(data) {
		res.write(data);
	});
	stream.on('end', function() {
		res.end();
	});
}).listen(3000);
