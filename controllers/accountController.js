const User = require('../model/user');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
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
exports.post_signin = function(req, res) {
	const email = req.body.name;
	const password = req.body.passport;
	User.findOne({ email }, (err, user) => {
		if (err) throw err;
		if (!user) {
			res.status(401).send({ success: false, msg: 'Tên đăng nhập hoặc mật khẩu sai.' });
		} else {
			// check if password matches
			user.comparePassword(password, function(err, isMatch) {
				if (isMatch && !err) {
					// if user is found and password is right create a token
					var token = jwt.sign(user.toJSON(), config.secret, {
						expiresIn: 604800 // 1 week
					});
					// return the information including token as JSON
					res.json({ success: true, token: 'JWT ' + token });
					// res.render('customer-views/index', { title: 'Trang chủ' });
				} else {
					res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
				}
			});
		}
	});
};

exports.post_signup = function(req, res) {
	if (!req.body.name || !req.body.password || req.body.repassword != req.body.password) {
		console.log('user empty');
		//res.render('customer-views/signup', { title: 'Đăng ký' });
		res.status(401).send({ success: false, msg: 'Điền thông tin chưa chính xác.' });
	} else {
		const email = req.body.email;
		const userExist = User.findOne({ email: email }, (err, results) => {
			console.log('user exist ', results);
			if (results != null) {
				res.render('customer-views/signup', {
					title: 'Đăng ký thất bại',
					message: `Email ${email} đã tồn tại. Vui lòng dùng email này để đăng nhập hoặc đăng ký tài khoản bằng email khác.`
				});
			} else {
				const newUser = {
					name: req.body.name,
					password: req.body.passport,
					email: req.body.email
				};
				const user = new User(newUser);
				user.save().then((objext) => {
					const x = User.findOne({ name: 'Lý' }, (err, x) => {
						console.log('new password: ', x.password, '- name: ', x.name, '- email: ', x.email);
					});
					res.render('customer-views/update-infor', {
						title: 'Thay đổi thông tin',
						message: 'Đăng ký thành công',
						name: req.body.name
					});
				});
			}
		});
	}
};
