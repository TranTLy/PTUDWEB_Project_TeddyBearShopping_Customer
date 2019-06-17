var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OriginSchema = new Schema(
	{
		name: String,
		isDelete: Boolean
	},
	{ collection: 'origins' }
);

module.exports = mongoose.model('Origin', OriginSchema);
