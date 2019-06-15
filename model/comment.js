var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var CommentSchema = new Schema(
	{
		idProduct: {
			type: SchemaTypes.ObjectId
		},
		idUser: {
			type: SchemaTypes.ObjectId
		},
		content: {
			type: String
		},
		time: {
			type: Date,
			default: Date.now()
		}
	},
	{ collection: 'comment' }
);

module.exports = mongoose.model('Comment', CommentSchema);
