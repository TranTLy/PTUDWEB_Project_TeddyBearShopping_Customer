var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var ProducerSchema = new Schema(
	{
		name: String
	},
	{ collection: 'producer' }
);

module.exports = mongoose.model('Producer', ProducerSchema);
