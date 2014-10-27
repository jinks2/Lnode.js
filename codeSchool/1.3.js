var fs = require("fs");
fs.readFile("0.js",function(err,contents) {
	console.log(contents.toString());
});
console.log("it work");