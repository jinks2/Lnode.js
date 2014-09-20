var http = require("http");

http.createServer(function(req,res) {
	res.writeHead(200);
	req.on("data",function(chunk) {//req
		res.write(chunk);
	});
	req.on("end",function() {//req
		res.end();
	})
}).listen(8080);
console.log("it work");

/*
http.createServer(function(req,res) {
	res.writeHead(200);
	req.pipe(res);
}).listen(8080);
*/
