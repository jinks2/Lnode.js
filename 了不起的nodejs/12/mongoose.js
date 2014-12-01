var express =  require('express');
var mongoose = require('mongoose');


//建立模型
var Schema = mongoose.Schema;
var User = mongoose.model('User', new Schema({
	first: String,
	last: String,
	email: {type: String, unique: true},
	password: {type: String, index: true}
}));


var app = express.createServer(
	express.bodyParser(),express.cookieParser(),express.session({secret: 'my secret'})
	);


app.use(function(req, res, next) {
    if (req.session.loggedIn) {
        res.local('authenticated', true);
        User.findById(req.session.loggedIn, function(err, doc) {
            if (err) return next(err);
            res.local('me', doc);
            next();
        });
    } else {
        res.local('authenticated', false);
        next();
    }
});


app.set('view engine', 'jade');
app.set('view options', {layout: false});

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
    User.findOne({email: req.body.user.email, password: req.body.user.password}, function(err, doc) {
        if (err) return next(err)
        if (!doc) return res.send('User not found. Go back and try again');
        req.session.loggedIn = doc._id.toString();
        res.redirect('/');
    })
});

app.get('/logout', function(req, res) {
    req.session.loggedIn = null
    res.redirect('/')
});

app.get('/signup', function(req, res) {
    res.render('signup')
});

app.post('/signup', function(req, res, next) {
    var user = new User(req.body.user);
    user.save(function(err) {
    	if (err) return next(err);
    	res.redirect('/login/' + user.email);
    });
});

//连接数据库
mongoose.connect('mongodb://127.0.0.1/my-website');
app.listen(3000, function() {
	console.log('\033[96m + \033[39m app listening on *: 3000');
});
