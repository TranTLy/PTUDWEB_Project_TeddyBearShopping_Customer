var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var UserSchema = new Schema(
  {
    name: {
      type: String
    },
    birthday: {
      type: Date,
      default: Date.now()
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
      type: String,
      default: "Nữ"
    },
    reset_password_token: {
      type: String
    },
    reset_password_expires: {
      type: Date
    },
    isAuth: {
      type: Boolean,
      default: false
    }
  },
  { collection: "customers" }
);

module.exports = mongoose.model("User", UserSchema);
