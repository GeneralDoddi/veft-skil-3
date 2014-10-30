// server-api.js

// BASE SETUP
// ===============================================================================================

// call the packages we need
var express = 	require('express');
var app 	=	express();
var bodyParser	=	require('body-parser');
var mongoose	=	require('mongoose');
var message		=	require('./models/dbobjects.js');
var elasticsearch = require('elasticsearch');
mongoose.connect('mongodb://localhost/test', { keepAlive: 1});

// Database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error:'));
db.once('open', function callback(){
	//yay!
	console.log("DB OPEN!");
})

var client = new elasticsearch.Client({
	host: 'localhost:8080'
});


//configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;		//set our port

// ROUTES FOR OUR API

// =============================================================================================
var router	=	express.Router();	// get an instance of the express router

//test route to make suer everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req,res){
	res.json({ message: 'hooray! welcome to our api!'});
});

router.get('/allKeys', function(req,res){
	message.find({},function(err, object){
		if(err){
			console.log("feck " + err)
		}
		else{

			console.log(object);
			res.json(object);
		}
	});
	
});

// more routes for our API will happen here

// REGISTER OUR ROUTES ------------------
// al of our routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================================
app.listen(port);
console.log('Magic happens on port ' + port);