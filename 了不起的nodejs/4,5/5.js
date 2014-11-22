var fs = require('fs');
process.chdir('files')
var files = fs.readdirSync(process.cwd());
files.forEach(function(file) {
  if(/\.css/.test(file)) {
  	fs.watchFile(process.cwd() + '/' + file, function() {
  		console.log('-' + file + ' changed!');
  	})
  }
})
