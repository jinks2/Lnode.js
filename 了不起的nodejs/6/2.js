var net=require('net');

var count=0,users={};

var server=net.createServer(function (conn) {
conn.write(
    '\r\n > welcome to \033[92mnode-chat\033[39m!'
  + '\r\n > ' + count + ' other people are connected at this time.'
  + '\r\n > please write your name and press enter: '
);
count++;

var nickname;

function broadcast (msg,exceptMyself) {
  for (var i in users) {
   if (!exceptMyself || i != nickname) {
    users[i].write(msg);
   }
  }
}

conn.on('data',function (data) {
  //data=data.replace('\r\n','');
  if(!nickname){
   if(users[data]){
    conn.write('\r\n \033[93m> nickname already in use.try again:\033[39m ');
    return;
   }else{
    nickname=data;
    users[nickname]=conn;

    broadcast('\r\n \033[90m > ' + nickname + ' joined the room\033[39m'); 
   }
  }
  else{
    broadcast('\r\n \033[96m > ' + nickname + ':\033[39m ' + data,true); 
  }
});
conn.setEncoding('utf8');
conn.on('close',function () {
  count--;
  delete users[nickname];
  broadcast('\r\n \033[90m > ' + nickname + ' left the room\033[39m');
});
});

server.listen(3000,function () {
console.log('\r\n \033[96m   server listening on *:3000\033[39m');
});
