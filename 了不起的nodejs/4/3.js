
console.log(process.argv);
console.log(process.argv.slice(2));
console.log(__dirname);
console.log(process.cwd());
process.chdir('D:/Dict');
console.log(process.cwd());
//console.log(process.env);
console.log(process.env.Path);
/*
console.error('An error occurred');	
process.exit();
*/
var data = 'das dad ad';
console.log('\033[90m' + data.replace(/(.*)/g, '  $1') + '\033[39m');
