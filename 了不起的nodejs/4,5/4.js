var fs = require('fs');
/*
fs.readFile('./2.js',function(err,data) {
	console.log(data.toString());
});*/
var stream = fs.createReadStream('./2.js');
stream.on('data', function(data) {
	console.log(data.toString());
});
stream.on('on',function(data) {
  console.log(data.toString());
})