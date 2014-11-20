var fs = require('fs');
fs.watch(process.cwd(), function (event, filename) {
  console.log(event,filename);
}); 