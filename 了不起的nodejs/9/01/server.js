var express = require('express');  //引入
var search = require('./search');

var app = express.createServer();   //初始化wen服务器,这里并不能简化

//设置模版引擎以及视图文件所在的目录
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.set('view options', {layout: false});  //在渲染视图的时候会传递到每一个模版


//console.log(app.set('views'));  //获取配置信息
//console.log(app.set('view options')); 

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/search', function(req, res, next) {
	search(req.query.q, function(err, tweets) {
		if(err) return next(err);
		res.render('search', {results: tweets, search: req.query.q});
	})
});

app.listen(3000);