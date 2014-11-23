var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
	if('GET' === req.method && '/img' === req.url.substr(0,4) && '.jpg' === req.url.substr(-4)) {
		fs.stat(__dirname + req.url, function(err, stat) { //检查文件是否存在
			if(err || !stat.isFile()) {
				res.writeHead(404);
				res.end('Not Found');
				return;
			}
			serve(__dirname + req.url, 'image/png');  //'application/jpg'：会下载图片
		});
	} else if('GET' === req.method && '/' === req.url) {
		serve(__dirname + '/index.html','text/html');
	} else {
		res.writeHead(400);
		res.end('Not Found');
	}
	function serve(path, type) {
		res.writeHead(200, {'Content-Type': type});
		fs.createReadStream(path).pipe(res); //将文件系统流接到HTTP响应流中;
	}

});
server.listen(3000);


