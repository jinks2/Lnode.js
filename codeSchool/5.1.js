var express = require("express");
var app = express();
app.get("/",function(req,res) {
	res.sendfile(__dirname+ //double _
		"/0.js")
});
app.listen(8080);
console.log("it work");