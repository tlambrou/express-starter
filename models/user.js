var mongoose = require('mongoose'),
Schema = mongoose.Schema
// bycrypt = require('bycrypt'),
// salt = bycrypt.genSaltSync(10);

var UserSchema = new Schema( {
  email: String,
  passwordDigest: String
});

// create a new user with secure (hashed) password
// UserSchema.statics.createSecure = function(email, password, callback) {
//   // 'this' references our Schema
//   // store it in variable 'user' because 'this' changes context in nested callbacks
//
//   var user = this;
//
//   // has password user enters at sign up
//   bcrypt.genSalt(function (err, salt) {
//     bycrypt.hash(password, salt, function (err, hash) {
//       console.log(hash);
//
//       // create the new user (save to db) with hashed password
//       user.create({
//         email: email,
//         passwordDigest: hash
//       }, callback);
//     });
//   });
// };

var User = mongoose.model('User', UserSchema);

//export user model
module.exports = User;
