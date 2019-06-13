const User = require('../model/user');
var passport = require('passport');
require('../config/passport');
var Bcrypt = require('bcryptjs');
var config = require('../config/database');

var jwt = require('jsonwebtoken');

exports.signup = function(req, res) {
	res.render('customer-views/signup', { title: 'Đăng ký' });
};
exports.forget_password = function(req, res) {
	res.render('customer-views/forget-password', { title: 'Quên mật khẩu' });
};
exports.change_password = function(req, res) {
	res.render('customer-views/change-password', { title: 'Đổi mật khẩu' });
};
exports.update_infor = function(req, res) {
	res.render('customer-views/update-infor', { title: 'Thay đổi thông tin' });
};

exports.post_signin = async function(req, res) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Something is not right',
				user: user
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				res.send(err);
			}
			// generate a signed son web token with the contents of user object and return it in the response
			var payload = { _id: user._id, email: user.email, name: user.name };
			var token = jwt.sign(payload, config.secret, {
				expiresIn: 86400 // 1 day
			});
			// jwt.verify(token, config.secret, function(err, data) {
			// 	console.log('verify jwt');
			// 	console.log(err, data);
			// });
			//return res.json({ user, token });
			res.json({ success: true, token: 'JWT ' + token });
		});
	})(req, res);
};

exports.post_signup = async function(req, res) {
	if (!req.body.name || !req.body.password || req.body.repassword != req.body.password) {
		res.render('customer-views/signup', {
			title: 'Đăng ký thất bại',
			message: 'Điền thông tin chưa chính xác'
		});
	} else {
		User.findOne({ email: req.body.email }, (err, results) => {
			if (results != null) {
				res.render('customer-views/signup', {
					title: 'Đăng ký thất bại',
					message: `Email ${req.body.email} đã tồn tại. Vui lòng đăng ký tài khoản bằng email khác.`
				});
			} else {
				req.body.password = Bcrypt.hashSync(req.body.password, 10);
				const user = new User({ name: req.body.name, password: req.body.password, email: req.body.email,
										gender: req.body.gender, birthday: req.body.birthday, phoneNumber: req.body.phoneNumber});

				var result = user.save();
				res.render('customer-views/update-infor', {
					title: 'Thay đổi thông tin',
					message: 'Đăng ký thành công',
					name: req.body.name,
					birthday: req.body.birthday,
					phoneNumber: req.body.phoneNumber
				});

				// //  create token
				// var token = jwt.sign(user.toJSON(), config.secret, {
				// 	expiresIn: 86400 // 1 day
				// });
			}
		});
	}
};

// (exports.signout = passport.authenticate('jwt', { session: false })),
// 	function(req, res) {
// 		console.log('user form req: ', req.user);
// 		res.json({ message: 'Success! You can not see this without a token' });
// 	};

exports.signout = (req, res, next) => {
	// var token = getToken(req.headers);
	// if (token) {
	// 	res.json(req.user, token);
	// }
	// else{

	// }
	//console.log('on signout, req header', req.headers.authorization);
	passport.authenticate('jwt', { session: false }, (err, user) => {
		if (user) {
			console.log('successfully!');
			res.send(req.user);
		}
	});
};

getToken = function(headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};
