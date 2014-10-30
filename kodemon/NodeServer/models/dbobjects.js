var mongoose	=	require('mongoose');
var Schema		=	mongoose.Schema;

var MessageSchema	=	new Schema({
	execution_time: Number,
	timestamp: { Type: Date },
	token: String,
	key: String
});

module.exports = mongoose.model('Message', MessageSchema);