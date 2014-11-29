//Socket.IO自带了其浏览器端运行的代码，直接使用；
window.onload = function() {

	//所有Socket.IO客户端代码暴露出来的方法和类都在io命名空间中;
	var socket = io.connect();

	socket.on("connect", function() {
		//通过join事件发送昵称;
		socket.emit('join', prompt('What is your nickname?'));
        //显示聊天窗口
		document.getElementById('chat').style.display = 'block';

		socket.on('announcement', function(msg) {
		var li = document.createElement('li');
		li.className = 'announcement';
		li.innerHTML = msg;
		document.getElementById('messages').appendChild(li);
	    });
	});

    function addMessage (from, text) {
    	var li = document.createElement('li');
    	li.className = 'message';
    	li.innerHTML = '<b>' + from + '</b>: ' + text;
    	document.getElementById('messages').appendChild(li);
    	return li;
    }

	var input = document.getElementById('input');

	document.getElementById('form').onsubmit = function() {
		//这里是在自己的广播提交之后立即将信息打印出来，并没有服务器确认是否接受成功；
		var li = addMessage('me', input.value);
		socket.emit('text', input.value, function(data) {
			//这个回调函数用于确认消息接受成功；
			li.className = 'confirmed';
			li.title = date;
		});

		//重置输入框
		input.value = '';
		input.focus();
		return false;
	}
	//用于打印其他用户广播；
	socket.on('text', addMessage);
}