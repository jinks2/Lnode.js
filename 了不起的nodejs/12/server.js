var express = require('express');
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID; 

var app = express.createServer();



//加入中间件
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'my secret'}));
app.use(function(req, res, next) {                 //身份验证中间件
    if (req.session.loggedIn) {
        res.local('authenticated', true);   //express 的res.local   API
        app.users.findOne({"_id": ObjectId(req.session.loggedIn)}, function(err, doc) {
            if (err) return next(err);
            res.local('me', doc);
            next()
        })
    } else {
        res.local('authenticated', false);
        next()
    }
});




app.set('view engine', 'jade');
//express 3不需要这段代码
app.set('view options', {layout: false});




//创建mongodb.Server 初始化服务器
var server = new mongodb.Server('127.0.0.1', 27017);

//告诉驱动器连接数据库'my-website'，不存在会创建
new mongodb.Db('my-website', server, {w: 1}).open(function(err, client) {
    if (err) {
        throw err
    }
    console.log('\033[96m + \033[39m connected to mongodb');

    //创建数据库操作集合的快捷方式
    app.users = new mongodb.Collection(client, 'users');
    // 不管索引是否存在，都可以调用这个命令来确保在查询前建立了索引
    client.ensureIndex('users', 'email', function(err) { 
        if (err) throw err
        client.ensureIndex('users', 'password', function() {
            if (err) throw err
        });
        console.log('\033[96m + \033[39m ensured indexes');
        app.listen(3000, function() {
            console.log('\033[96m + \033[39m app listening on *:3000');
        })
    })
});




app.get('/', function(req, res) {
    res.render('index')
});
app.get('/login', function(req, res) {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('login', {signupEmail: ''});
    }
});
app.get('/login/:signupEmail', function(req, res) {
    res.render('login', {signupEmail: req.params.signupEmail});
});
app.post('/login', function(req, res) {
    //文档查找
    app.users.findOne({email: req.body.user.email, password: req.body.user.password}, function(err, doc) {
        if (err) return next(err)
        if (!doc) return res.send('User not found. Go back and try again');
        req.session.loggedIn = doc._id.toString();
        res.redirect('/');
    })
});
app.get('/logout', function(req, res) {
    req.session.loggedIn = null
    res.redirect('/');
});
app.get('/signup', function(req, res) {
    res.render('signup');
});
app.post('/signup', function(req, res, next) {
    //创建文档
    app.users.insert(req.body.user, function(err, doc) {
        if (err) {
            return next(err)
        }
        res.redirect('/login/' + doc[0].email);
    })
});



