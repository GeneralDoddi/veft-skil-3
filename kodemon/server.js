var dgram = require("dgram");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');


mongoose.connect('mongodb://localhost/test', { keepAlive: 1});
var rcvdMessage		=	require('./NodeServer/models/dbobjects.js');

var server = dgram.createSocket("udp4");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error:'));
db.once('open', function callback(){
	//yay!
	console.log("DB OPEN!");
})

var client = new elasticsearch.Client({
  host: 'localhost:9200'
});

server.on("message", function(msg, rinfo){
  console.log('got message from client: ' + msg);

  var parsedmsg = JSON.parse(msg);
  var rcvmessage = new rcvdMessage();


  rcvmessage.execution_time = parsedmsg.execution_time;
  rcvmessage.timestamp = new Date(parsedmsg.timestamp*1000);
  rcvmessage.token = parsedmsg.token;
  rcvmessage.key = parsedmsg.key;

  rcvmessage.save(function(err, b){
  	if(err)
  	{
  		console.log('saving failed ' + err);
  	}
  	else{
  		console.log('saving');
      
      client.index({
        index: 'kodemon',
        type: 'execution',
        id: String(b._id),
        body: rcvmessage},
        function (error, response) {
          if(error){
            console.log(error);
          }
          else{
            console.log(response);
          }
        });
  	}
  	
  });
});

server.on('listening', function(){
  console.log('Kodemon server listening on')
  console.log('hostname: ' + server.address().address);
  console.log('port: ' + server.address().port);
});

server.bind(4000)