var express = require('express'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    // url 模块是 Node.js 标准库里面的
    url = require('url'),
    eventproxy = require('eventproxy');

var app = express();

var cnodeUrl = 'https://cnodejs.org/';

app.get('/', function (req, res, next) {
	// 用 superagent 去抓取 https://cnodejs.org/ 的内容
	superagent.get(cnodeUrl)
	.end(function (err, sres) {  //由于前面已经定义了res,这里改为sres
	// 常规的错误处理	
		if(err) {
			return next(err)
		}
	// sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`	
	var $ = cheerio.load(sres.text);
	var items = [];
	var topicUrls = [];
	//节点为网页的节点
	$('#topic_list .topic_title').each(function (index, elem) {
		var $elem = $(elem);
		items.push({
			title: $elem.attr('title'),
			href: $elem.attr('href')
		});
		// $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
	    // 用 url.resolve 来自动推断出完整 url，变成
	    // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
        var href = url.resolve(cnodeUrl, $elem.attr('href'));
        topicUrls.push(href);
	});
	res.send(items);
	console.log(topicUrls);


	var ep = new eventproxy();
	// 命令 ep 重复监听 topicUrls.length 次 `topic_html` 事件
	ep.after('topic_html', topicUrls.length, function (topics) {

		topics = topics.map(function (topicPair) {
			var topicUrl = topicPair[0];
			var topicHtml = topicPair[1];
			var $ = cheerio.load(topicHtml);
			return ({
				title: $('.topic_title').text().trim(),
				href: topicUrl,
				comment1: $('.reply_content').eq(0).text().trim()
			})
		});
		console.log('final: ');
		console.log(topics);
	})

	topicUrls.forEach(function (topicUrl) {
		superagent.get(topicUrl)
		.end(function (err, res) {
			console.log('fetch ' + topicUrl + ' successful');
			ep.emit('topic_html', [topicUrl, res.text]);
		})
	});

  });
});

app.listen('3000', function () {
	console.log('application works on port:3000');
});