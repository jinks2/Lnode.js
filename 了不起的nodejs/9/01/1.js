//process.env.NODE_ENV = 'production';

var app = require('express').createServer();

app.set('env','production');
app.configure('production', function() {
	app.disable('view cache');
});

app.configure(function(){
  app.set('title', 'My Application');
});

app.configure(function(){
  app.enable('case sensitive routing');
});
console.log(app.set('view cache'));
console.log(app.set('case sensitive routing'));

app.listen(3000);
