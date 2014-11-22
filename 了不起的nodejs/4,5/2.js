var fs = require('fs'),
    cwd = process.cwd;  //当前绝对路径
    stdin = process.stdin,
    stdout = process.stdout,  //简化
    stats = [];

fs.readdir(cwd(), function  (err, files) {
	console.log(' ');
	if(!files.length) {
		return console.log('\033[31m No files to show!\033[39m\n');
	}
	console.log('Select which file or directory you want to see\n');

	function file(i) {
		var filename = files[i];
		fs.stat(__dirname + '/' + filename, function (err, stat) {  //文件或文件夹的原目录
			stats[i] = stat;
			if(stat.isDirectory()) {  //文件夹的话
				console.log(' ' + i + ' \033[36m' + filename + '/\033[39m');
			} else {
				console.log(' ' + i + ' \033[90m' + filename + '\033[39m');
			}
			if(++i == files.length) {
				read();
			} else {
				file(i);
			}
		});
	};
	function read() {
		console.log(' ');
		stdout.write(' \033[33mEnter your choice: \033[39m');
		stdin.resume(); //等待用户输入
		stdin.setEncoding('utf8');   //设置流编码‘utf8'支持特殊字符;
		stdin.on('data', option);  //监听data事件;
	};
	function option(data) {
		var filename = files[Number(data)];
		if(!filename) {
			stdout.write(' \033[31mEnter your choice: \033[39m');
		} else {
			stdin.pause(); //停止输入
			if(stats[Number(data)].isDirectory()) {
						fs.readdir(__dirname + '/' + filename, function(err, files) {
							console.log(' ');
							console.log(' (' + files.length + ' files' + ')');
							files.forEach(function(file) {
								console.log(' - ' + files);
							});
							console.log(' ');	
						});
					} else {
						fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
							console.log(' ');
							console.log('\033[90m' + data.replace(/(.*)/g, ' $1') + '\033[39m');
						})
					}
		}
	};
	file(0);
});