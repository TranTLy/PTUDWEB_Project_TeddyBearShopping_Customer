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
	console.log('user before go to update infor: ', req.cookies.user);
	res.render('customer-views/update-infor', { title: 'Thay đổi thông tin', user: req.cookies.user });
};

exports.post_signin = async function(req, res) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Something is not right',
				user: user
			});
		}
		console.log('user in signin: ', user);
		req.login(user, (err) => {
			if (err) {
				res.send(err);
			}
			// generate a signed son web token with the contents of user object and return it in the response
			var token = jwt.sign({ user }, config.secret, {
				expiresIn: 86400 // 1 day
			});
			res.cookie('token', token);
			res.cookie('user', user);
			// console.log('login successfully! is login: ', req.isAuthenticated());
			res.redirect('/');
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
				const user = new User({
					name: req.body.name,
					password: req.body.password,
					email: req.body.email,
					gender: req.body.gender,
					birthday: req.body.birthday,
					phoneNumber: req.body.phoneNumber
				});

				var result = user.save();
				req.login(user, { session: false }, (err) => {
					if (err) {
						res.send(err);
					}
					// generate a signed son web token with the contents of user object and return it in the response
					var token = jwt.sign({ user }, config.secret, {
						expiresIn: 86400 // 1 day
					});
					res.cookie('token', token);
					res.cookie('user', user);
					console.log('sign up successfully!');
					res.render('customer-views/update-infor', {
						title: 'Thay đổi thông tin',
						message: 'Đăng ký thành công',
						name: req.body.name,
						birthday: req.body.birthday,
						phoneNumber: req.body.phoneNumber
					});
				});
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
	console.log('on logout');
	req.logout();
	res.clearCookie('user');
	res.clearCookie('token');
	res.redirect('/');
	console.log('on redirect');
};

exports.isLogin = function(req, res, next) {
	console.log('is authen 3: ', req.isAuthenticated());
	// console.log('user in cookie: ', req.cookies.user);
	if (req.cookies.user) {
		return next();
	} else {
		return res.send({
			message: 'Bạn cần đăng nhập để thực hiện chức năng này.'
		});
	}
	// if (req.isAuthenticated()) {
	// 	return next();
	// } else {
	// 	return res.send({
	// 		message: 'Bạn cần đăng nhập để thực hiện chức năng này.'
	// 	});
	// }
};
