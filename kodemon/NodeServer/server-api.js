// server-api.js

// BASE SETUP
// ===============================================================================================

// call the packages we need

var express 		= 	require('express');
var app 			=	express();
var bodyParser		=	require('body-parser');
var mongoose		=	require('mongoose');
var message			=	require('./models/dbobjects.js');
var elasticsearch 	= 	require('elasticsearch');
var cors 			=	require('cors');
//var cors 			=	require('cors');
mongoose.connect('mongodb://localhost/test', { keepAlive: 1});

// Allow-Origin 
app.use(cors());

// Database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error:'));
db.once('open', function callback(){
	//yay!
	console.log("DB OPEN!");
})

var client = new elasticsearch.Client({
	host: 'localhost:9200'
});


//configure app to use bodyParser()
// this will let us get the data from a POST


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;		//set our port

// ROUTES FOR OUR API

// =============================================================================================
var router	=	express.Router();	// get an instance of the express router

//test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req,res,next){
	res.json({ message: 'hooray! welcome to our api!'});
});

/*
	***************** ELASTIC SEARCH SETUP ************************

	run this string in console on elasticsearch to set the parameters for searching

	curl -XPUT localhost:9200/kodemon -d '{
		"mappings": {
			"execution": {
				"_timestamp": {
					"enabled": "true"
					},
		"properties": {
			"execution_time": {
				"type": "integer"
				},
		"timestamp": {
			"type": "date"
		},
		"token": {
			"type": "string",
			"index": "not_analyzed"
		},
		"key": {
		"type": "string",
		"index": "not_analyzed"
		}
		}
		}
		}
		}
		'
*/

router.get('/allKeys', function(req,res,next){
	client.search({
			index: 'kodemon',
			size: 0,
			body: {
				aggregations: {
					key_list: {
						terms: {
							field: 'key'

							}	
						}
					}
				}
	},function(err, object) { 
		if(err){
			console.log("feck " + err)
		}
		else{
			console.log(object);
			res.json(object);
		}
	});

	// mongodb search
	/*message.find().distinct('key',function(err, object){

		if(err){
			console.log("feck " + err);
		}
		else{

			console.log(object);
			res.json(object);
		}
	});*/
	
});

router.get('/executionTimes/:key', function(req,res){

	client.search({
		index: 'kodemon',
		body: {
			query: {
				query_string: {
					query: req.params.key
				}
			}
		}
	}).then(function (object) {
		console.log(object);
		res.json(object);
	});

	//mongodb search 
	/*message.find({'key': req.params.key},'execution_time', function(err, object){
		if(err){
			console.log("feck " + err);
		}
		else{
			//var derp = JSON.parse(object);
			console.log(object);
			res.json(object);
		}
	});*/
});

router.get('/executionTimes/:key/from/:date1/to/:date2',function(req,res){
	
	client.search({
		index: 'kodemon',
		type: 'execution',
		body: {
			query : {
				filtered : {
					query: {
						query_string: {
							query : req.params.key
							}
						},
						filter: {
							range : {
								timestamp: {
									gte: new Date(req.params.date1),
									lt: new Date(req.params.date2)
								}
							}
						}
					}
				}
			}
		}, function(err, object) {
			console.log(object);
			res.json(object);
		});

	/* // mongoDB connection
	message.find({'key': req.params.key})
	.where('timestamp')
	.gt(new Date(req.params.date1))
	.lt(new Date(req.params.date2))
	.select('execution_time').exec(function(err, object){
		if(err){
			console.log(err);
		}
		else{
			console.log(object);
			res.json(object);
		}
		
	});*/
});

// more routes for our API will happen here

// REGISTER OUR ROUTES ------------------
// al of our routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================================
app.listen(port);
console.log('Magic happens on port ' + port);