var http = require('http');
var fs = require('fs');
http.createServer(function(request, response) {
  response.writeHead(200,{"Content-Type":"text/html"});
  fs.readFile("101.js",function(err,contents) {
  	response.write(contents.toString());
    response.end("this is end"); //this must be here;
  });

}).listen(8080);
console.log("it work");