var fs = require('fs');
var file = fs.createReadStream("1.1.js");
/*
file.on("data",function(data) {
	console.log(data.toString());
});
*/
//use this instead of last
//precess.stdout.write() = console.log()
file.pipe(process.stdout,{ end: false });
//you must let end false,so can use "end" agin;

file.on("end", function() {
  console.log('--File Complete--');
});