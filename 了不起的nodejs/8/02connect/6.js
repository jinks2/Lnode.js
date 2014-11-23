var connect = require('connect');
var server = connect();
//server.use(connect.logger('dev'));
//server.use(connect.logger('default'));
//server.use(connect.logger('short'));
//server.use(connect.logger('tiny'));
server.use(connect.logger(':method :remote-addr'));
server.listen(3000);