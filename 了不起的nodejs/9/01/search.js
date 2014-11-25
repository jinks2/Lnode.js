var request = require('superagent');  //ajax api

module.exports = function search(query, fn) {
	request.get('https://twitter.com/search')
	.send({q:query})
	.end(function(res) {
		if(res.body && Array.isArray(res.body.results)) {
			return fn(null, res.body.results);
		}
		fn(new Error('Bad twitter response'));
	})
}

