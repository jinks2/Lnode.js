var http = require("http");
http.createServer(function(req,res) {
	res.writeHead(200);
	res.write("Dog is runing");
	setTimeout(function() {
		res.write("Dog is done");
		res.end();
	},10000)
}).listen(8080);
console.log("Server work");