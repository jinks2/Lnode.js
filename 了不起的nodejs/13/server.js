var express = require('express');
var mysql = require('mysql');
var config = require('./config');

app = express.createServer();


app.use(express.bodyParser());
app.set('view engine', 'jade');
app.set('views','views');
app.set('view options', {layout: false});

//连接数据集
var db = mysql.createClient(config);


//首页路由
app.get('/', function(req, res, next) {
	db.query('SELECT id, title, description FROM item', function(err, results) {
		res.render('index', {items: results});
	});
});
//创建商品的路由
app.post('/create', function(req, res, next) {
	   //使用?避免字符串拼接，从而避免SQL注入攻击，但需要使用替换数据的第二参数
	db.query('INSERT INTO item SET title = ?, description = ?',
	[req.body.title, req.body.description], function(err, info) {
		if(err) return next(err);
		//通过info.insertId来创建商品的id
		console.log('-item created with id %s', info.insertId);
		res.redirect('/');
	});
});
//查看商品路由
app.get('/item/:id', function(req, res, next) {
	function getItem (fn) {
		db.query('SELECT id, title, description FROM item WHERE id= ? LIMIT 1',
		[req.params.id], function (err, results) {
			if(err) return next(err);
			if(!results[0]) return res.send(404);
			fn(results[0]);
		});
	}
	function getReviews (item_id, fn) {
		db.query('SELECT text, stars FROM review WHERE item_id= ?',
			[item_id], function (err, results) {
				if(err) return next(err);
				fn(results);
			});
	}
	getItem(function (item) {
		getReviews(item.id, function (reviews) {
			res.render('item', {item: item, reviews: reviews});
		});
	});
});
//评价商品的路由
app.post('/item/:id/review', function(req, res, next) {
	db.query('INSERT INTO review SET item_id = ?, stars = ?, text = ?',
	[req.params.id, req.body.stars, req.body.text], function(err, info) {
		if (err) return next(err);
		console.log('-review created with id %s', info.insertId);
		res.redirect('/item/' + req.params.id);
	});
});


app.listen(3000, function() {
	console.log(' - listeing on http://*:3000');
});
