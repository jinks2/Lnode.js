require('http').createServer(function (req, res) {
	res.writeHead(200,{'Content-Type':'image/png'});
	require('fs').createReadStream('1.png').pipe(res);
}).listen(3000);
