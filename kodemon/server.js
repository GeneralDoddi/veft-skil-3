var dgram = require("dgram");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test', { keepAlive: 1});
var rcvdMessage		=	require('./NodeServer/models/dbobjects.js');

var server = dgram.createSocket("udp4");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error:'));
db.once('open', function callback(){
	//yay!
	console.log("DB OPEN!");
})

server.on("message", function(msg, rinfo){
  console.log('got message from client: ' + msg);

  var parsedmsg = JSON.parse(msg);
  var rcvmessage = new rcvdMessage();


  rcvmessage.execution_time = parsedmsg.execution_time;
  rcvmessage.timestamp = parsedmsg.timestamp;
  rcvmessage.token = parsedmsg.token;
  rcvmessage.key = parsedmsg.key;

  rcvmessage.save(function(err){
  	if(err)
  	{
  		console.log('saving failed')
  	}
  	else{
  		console.log('saving');	
  	}
  	
  });
});

server.on('listening', function(){
  console.log('Kodemon server listening on')
  console.log('hostname: ' + server.address().address);
  console.log('port: ' + server.address().port);
});

server.bind(4000)