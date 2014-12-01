var request = require('superagent');
var assert = require('assert');

request.get('http://localhost:3000')
       .send({q: 'bieber'})
       .end(function (res) {
       	//断言判断响应状态码是否正确
       	assert.ok(200 == res.status);
       	//断言关键字是否存在
       	assert.ok(~res.text.toLowerCase().indexOf('bieber'));
       	//断言列表项是否存在
       	assert.ok(~res.text.indexOf('<li>'));
       });