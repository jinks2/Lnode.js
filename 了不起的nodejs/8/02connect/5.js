var connect = require('connect');
var time = require('./3.2');
var server = connect.createServer();


server.use(connect.query())
server.use(function (req, res) {
    console.log(req.query.name);	
})
server.listen(3000);