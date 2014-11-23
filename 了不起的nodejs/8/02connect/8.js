var connect = require('connect');
var fs = require('fs');
var server = connect(connect.logger('dev'),connect.static('static'),connect.bodyParser());

server.use(function(req, res, next) {
	if('POST' === req.method ) {
		fs.readFile(req.files.files.path, 'utf8', function(err, data) {
			if(err) {
				res.writeHead(500);
				res.end('Error!');
				return;
			}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end([
			'<h3>File: ' + req.files.files.name + '</h3>',
			'<h4>Type: ' + req.files.files.type + '</h4>',
			'<h1>Contents:</h4><pre>' + data + '</pre>'
			].join(''));	
		});
	} else {
		next();
	}
})

server.listen(3000);