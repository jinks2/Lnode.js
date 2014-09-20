var fs = require("fs");
var http = require("http");

http.createServer(function (req,res) {
	var newFile = fs.createWriteStream("0.js");
	req.pipe(newFile);
	req.on("end",function() {
		res.end("upload");
	})
}).listen(8080);
console.log("it work");