var express = require('express');

app = express.createServer();

app.use(express.static('public'));
app.use(express.bodyParser());


app.get('/', function (req, res) {
	res.render('index.html');
});

app.get('/test.html', function (req, res) {
	res.send('get-ok');
});

app.get('/test1.html', function (req, res) {
	res.send('get-ok1');
});

app.post('/test.html', function (req, res) {
	console.log(req.body);
	res.send(req.body);
});

app.listen(3000);