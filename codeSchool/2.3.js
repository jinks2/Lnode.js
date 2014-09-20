var http = require('http');

var server = http.createServer();
server.on('request', function(request, response) {
  response.writeHead(200);
  response.write("Hello, this is dog");
  response.end();
});
server.listen(8080);
//some name event, all can run
server.on('request', function(request, response) {
  console.log("New request coming in..." );
});
server.on("close",function(){
	console.log("Closing down the server...");
});