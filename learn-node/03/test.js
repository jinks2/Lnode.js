var main = require('./main');
var should = require('should');

describe('/test.js', function () {
	it('should qual 55 when n === 10', function () {
		main.fibonacci(10).should.equal(55);
	});
	it('should throw when n > 10', function () {
		(function () {
			main.fibonacci(11);
		}).should.throw('n should <= 10');
	});
});
