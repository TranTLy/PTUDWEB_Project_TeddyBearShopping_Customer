var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var ProductSchema = new Schema({
	_id: {
		type: SchemaTypes.ObjectId,
		required: true
	},
	type: {
		type: SchemaTypes.ObjectId,
		required: true
	},
	discount: {
		type: SchemaTypes.Decimal128,
		required: false,
		default: 0
	},
	isStandOut: {
		type: Boolean,
		required: true
	},
	isDeleted: {
		type: Boolean,
		required: true
	},
	isNewProduct: {
		type: Boolean,
		required: true
	},
	nameProduct: {
		type: String,
		required: true
	},
	price: {
		type: SchemaTypes.Number,
		required: true
	},
	size: {
		type: SchemaTypes.Number,
		required: true
	},
	rating: {
		type: SchemaTypes.Number,
		required: true
	},
	numberValidProduct: {
		type: SchemaTypes.Number,
		required: true
	},
	color: {
		type: String,
		required: true
	},
	imgs: {
		type: String,
		required: true
	},
	decription: {
		type: String,
		required: true
	},
	producer: {
		type: SchemaTypes.ObjectId,
		required: true
	},
	origin: {
		type: SchemaTypes.ObjectId,
		required: true
	},
	dateImport: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Product', ProductSchema);
