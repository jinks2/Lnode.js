var assert = require('assert');

var now = Date.now();
console.log(now);
assert.ok(now % 2 == 0);
