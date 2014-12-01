var express = require('express');
var utility = require('utility');
//返回一个 express 实例
var app = express();

//app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete
//req中包含了浏览器传来的各种信息，比如 query,body,headers;
//res一般不从里面取信息，而是来定制向浏览器输出的信息，比如 header 信息，想要向浏览器输出的内容。
//这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
app.get('/', function (req, res) {


	  // req.query 中取出我们的 q 参数： 如localhost:3000?q=jinks
	  // req.body 获得post 传来的 body 数据， express 默认不处理 body 中的信息，需要引入 body-parser 这个中间件
	var q = req.query.q;

	  // 调用 utility.md5 方法，得到md5值
	  // MD5的作用是让大容量信息在用数字签名软件签署私人密钥前被"压缩"成一种保密的格式
	var md5Value = utility.md5(q);
	res.send(md5Value);
});

app.listen(3000, function () {
	console.log('app is listening to port 3000');
});