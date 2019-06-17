var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var BillSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now()
        },
        id_customer: {
            type: SchemaTypes.ObjectId,
            ref: 'User'
        },
        city: String,
        status: String,
        discount: Number,
        total: Number,
        product: [{
            id_product:
            {
                type: SchemaTypes.ObjectId,
                ref: 'Product'
            },
            amount: Number
        }]
    }
);

module.exports = mongoose.model('Bill', BillSchema);
