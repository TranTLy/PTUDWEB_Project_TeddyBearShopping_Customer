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
		async function(email, password, cb) {
			// console.log('authen, email:', email, ', password: ', password);
			//this one is typically a DB call.
			//Assume that the returned user object is pre-formatted and ready for storing in JWT
			await User.findOne({ email }, (err, user) => {
				if (!user || !Bcrypt.compareSync(password, user.password)) {
					return cb(null, false, { message: 'Incorrect email or password.' });
				} else {
					// console.log('Found user in authen passport: ', user);
					return cb(null, user, { message: 'Logged In Successfully' });
				}
			}).catch((err) => cb(err));
		}
	)
);

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user.email);
});

// used to deserialize the user
passport.deserializeUser(function(email, done) {
	// console.log('on deserialize user: ', user);
	User.findOne({ email }, function(err, user) {
		done(err, user);
	});
});

// passport.use(
// 	'jwt',
// 	new JwtStrategy(
// 		{
// 			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 			secretOrKey: config.secret
// 		},
// 		function(jwtPayload, cb) {
// 			//find the user in db if needed
// 			console.log('jwt payload: ', jwtPayload._id);
// 			return UserModel.findOne({ email: jwtPayload.email })
// 				.then((user) => {
// 					return cb(null, user);
// 				})
// 				.catch((err) => {
// 					return cb(err);
// 				});
// 		}
// 	)
// );
