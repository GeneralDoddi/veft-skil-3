// server-api.js

// BASE SETUP
// ===============================================================================================

// call the packages we need
var express = 	require('express');
var app 	=	express();
var bodyParser	=	require('body-parser');
var mongoose	=	require('mongoose');
var message		=	require('./models/dbobjects.js');
mongoose.connect('mongodb://localhost/test');

// Database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error:'));
db.once('open', function callback(){
	//yay!
	console.log("DB OPEN!");
})


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

// more routes for our API will happen here

// REGISTER OUR ROUTES ------------------
// al of our routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================================
app.listen(port);
console.log('Magic happens on port ' + port);