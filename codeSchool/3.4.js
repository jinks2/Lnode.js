var http = require("http");
var fs = require("fs");
//show precent of upload progress 
http.createServer(function(req,res) {
	var newFile = fs.createWriteStream("0.js");
	var fileBytes = req.headers["content-length"];
	var uploadedBytes = 0;
	req.pipe(newFile);
	req.on("data",function(chunk) {
		uploadedBytes += chunk.length;
		var progress = (uploadedBytes/fileBytes)*100;
		res.write("progress: "+parseInt(progress,10)+"%\n");
	});
}).listen(8080);
console.log("it work");


/*
http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'image/png'});
  var file = fs.createReadStream('icon.png');
  file.pipe(response);
});
*/