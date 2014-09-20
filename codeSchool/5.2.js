var request = require("request");
var url = require("url");
var express = require("express");
var app = express();

app.get("/tweets/:username",function(req,res) {
	var username = req.param.username;
	options = {
		protocol : "http",
		host : "api.twitter.com",
		pathname: "/1/status/user_timeline.json",
		query:{screen_name: username,count:10}
	}
	var twitterUrl = url.format(options);
	request(twitterUrl).pipe(res);
}).listen(8080);
//http://127.0.0.1:8080/tweets/username