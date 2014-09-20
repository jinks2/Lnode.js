var fs = require("fs");

var file = fs.createReadStream("1.1.js");
var newFile = fs.createWriteStream("0.js");
file.pipe(newFile);

/*pipe actucally run like:

file.on('data', function(chunk) {
  var buffer_good = newFile.write(chunk);
  if(!buffer_good) {
       file.pause();
  }
});

newFile.on('drain',function(){  
    file.resume();        
});

file.on('end', function() {
  newFile.end();
});

*/