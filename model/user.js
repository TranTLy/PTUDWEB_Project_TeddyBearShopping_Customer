var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SchemaTypes = mongoose.Schema.Types;

var UserSchema = new Schema(
	{
		name: {
			type: String
		},
		birthday: {
			type: Date
		},
		email: {
			type: String
		},
		password: {
			type: String
		},
		phoneNumber: {
			type: String
		},
		gender: {
			type: String
		}
	},
	{ collection: 'customers' }
);

// UserSchema.pre('save', (next) => {
// 	var user = this;
// 	//	if (this.isModified('password') || this.isNew) {
// 	bcrypt.genSalt(10, (err, salt) => {
// 		if (err) {
// 			return next(err);
// 		}
// 		bcrypt.hash(user.password, salt, null, (err, hash) => {
// 			if (err) {
// 				return next(err);
// 			} else {
// 				user.password = hash;
// 				console.log('password hash: ', user.password);
// 				return next();
// 			}
// 		});
// 	});
// 	// }
// 	// else {
// 	// 	return next();
// 	// }
// });

// UserSchema.methods.comparePassword = (pass, cb) => {
// 	//console.log('this password: ', this.password);
// 	bcrypt.compare(pass, this.password, (err, isMatch) => {
// 		if (err) {
// 			return cb(err);
// 		} else {
// 			return cb(null, isMatch);
// 		}
// 	});
// };

module.exports = mongoose.model('User', UserSchema);
