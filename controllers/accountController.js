const User = require('../model/user');
var passport = require('passport');
var Bcrypt = require('bcryptjs');
var config = require('../config/database');
require('../config/passport')(passport);
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
	try {
		await User.findOne({ email: req.body.email }, (err, user) => {
			if (err) throw err;
			if (!user) {
				//user isn't exist
				res.status(401).send({ success: false, msg: 'Tên đăng nhập hoặc mật khẩu sai.' });
			} else {
				if (!Bcrypt.compareSync(req.body.password, user.password)) {
					//wrong password
					return res.status(400).send({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
				}
				var token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 86400 // 1 day
				});
				// return the information including token as JSON
				res.json({ success: true, token: 'JWT ' + token, message: 'Đăng nhập thành công' });
			}
		});
	} catch (err) {
		res.status(500).send(err);
	}
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
					message: `Email ${req.body
						.email} đã tồn tại. Vui lòng dùng email này để đăng nhập hoặc đăng ký tài khoản bằng email khác.`
				});
			} else {
				req.body.password = Bcrypt.hashSync(req.body.password, 10);
				const user = new User({ name: req.body.name, password: req.body.password, email: req.body.email,
										gender: req.body.gender, birthday: req.body.birthday, phoneNumber: req.body.phoneNumber});

				var result = user.save();
				res.render('customer-views/update-infor', {
					title: 'Thay đổi thông tin',
					message: 'Đăng ký thành công',
					name: req.body.name
				});

				// //  create token
				// var token = jwt.sign(user.toJSON(), config.secret, {
				// 	expiresIn: 86400 // 1 day
				// });
			}
		});
	}
};
