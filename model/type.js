var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var TypeSchema = new Schema({
	_id: {
		type: SchemaTypes.ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Type', TypeSchema);
