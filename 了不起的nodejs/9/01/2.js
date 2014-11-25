var app = require('express').createServer();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout: false}); 
/*
app.get('/:name?', function(req, res) {
	console.log(req.params);
});*/

app.get('/post/:name', function(req, res, next) {
	if('h' != req.params.name[0]) return next();
	console.log('test4');
});
app.get('/post/:name', function(req, res, next) {
	console.log('test');
});

app.listen(3000);

function secure(req, res, next) {
	if(!req.session.logged_in) {
		return res.send(403);
	}
	next();
};

app.get('/home', function() {
	//accessible to everyone
});

app.get('/financials',secure, function() {
	//secure
});

app.get('/about', function() {
	//accessible to everyone
});

app.get('/roadmap', secure, function() {
	//secure
});
