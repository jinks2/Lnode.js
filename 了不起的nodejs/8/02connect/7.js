var connect = require('connect');
var server = connect();

server.use(connect.logger('dev'));
server.use(connect.bodyParser());

server.use(function(req, res, next) {
	if('/' === req.url) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end([
			'<form method="post" action="/url">',
			'<h1>My form</h1>',
			'<fieldset>',
			'<label>Personal information</label>',
			'<p>What is your name?</p>',
			'<input type = "text" name = "name">',
			'<p><button>Submit</button></p>',
			'</form>'
		].join(''));
	} else {
		next();
	}
});

server.use(function(req, res, next) {
	if('/url' === req.url && 'POST' === req.method) {
		 console.log(req.body.file);
		} else {
			res.writeHead(404);
			res.end('Not Found');
		}
});

server.listen(3000);