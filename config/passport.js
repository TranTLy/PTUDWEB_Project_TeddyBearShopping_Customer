var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
var Bcrypt = require('bcryptjs');
const config = require('../config/database');

passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, cb) {
			console.log('authen, email:', email, ', password: ', password);
			//this one is typically a DB call.
			//Assume that the returned user object is pre-formatted and ready for storing in JWT
			return User.findOne({ email }, (err, user) => {
				console.log('Found user: ', user.name);
				if (!user || !Bcrypt.compareSync(password, user.password)) {
					return cb(null, false, { message: 'Incorrect email or password.' });
				} else {
					return cb(null, user, { message: 'Logged In Successfully' });
				}
			}).catch((err) => cb(err));
		}
	)
);

passport.use(
	'jwt',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.secret
		},
		function(jwtPayload, cb) {
			//find the user in db if needed
			console.log('jwt payload: ', jwtPayload._id);
			return UserModel.findOne({ email: jwtPayload.email })
				.then((user) => {
					return cb(null, user);
				})
				.catch((err) => {
					return cb(err);
				});
		}
	)
);

// // used to serialize the user for the session
// passport.serializeUser(function(user, done) {
// 	done(null, user);
// });

// // used to deserialize the user
// passport.deserializeUser(function(id, done) {
// 	User.findById(id, function(err, user) {
// 		done(err, user);
// 	});
// });
