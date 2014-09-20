var url = require('url');
var request = require('request');
var express = require('express');
var app = express();

options = {
  protocol: "http:",
  host: "search.twitter.com",
  pathname: '/search.json',
  query: { q: "codeschool"}
};

var searchURL = url.format(options); //url.format();
console.log(searchURL);
//like this: http://search.twitter.com/search.json?q=codeschool


request(searchURL,function(err,res,body) {
  console.log(body); 
});

app.get("/",function(req,response){
	request(searchURL).pipe(response); //it is request not req;
});
app.listen(8080); 