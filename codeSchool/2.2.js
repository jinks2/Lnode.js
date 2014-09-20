var events = require("events");
var EventEmitter = events.EventEmitter;

var chat = new EventEmitter();
var users = [], chatlog = [];

chat.on("message",function(msg) {
	chatlog.push(msg)
	console.log(chatlog);
});

chat.on("join",function(nickname) {
	users.push(nickname);
	console.log(users);
});

chat.emit("message","hello");
chat.emit("join","jinks");