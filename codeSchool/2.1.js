var EventEmitter = require("events").EventEmitter;
var logger = new EventEmitter();
//event: you can named whatever name of event;
logger.on("error",function(mes) {
	console.log("ERR: "+mes);
});
logger.emit("error","Spilled");
