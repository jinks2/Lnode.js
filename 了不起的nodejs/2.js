var a = require('./2_1');
var b = require('./2_2');
console.log(a.name);
console.log(a.data);
console.log(a.getPrivate());

var jinks = new b('jinks');
jinks.talk();

console.log(global.console);
console.log(process.on);

