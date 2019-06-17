const User = require("../model/user");
const Comment = require("../model/comment");
var passport = require("passport");
require("../config/passport");
var Bcrypt = require("bcryptjs");
var config = require("../config/database");
var nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "tranphunguyen111@gmail.com",
    pass: "nguyen5398"
  }
});

exports.signup = function(req, res) {
  res.render("customer-views/signup", { title: "Đăng ký" });
};
exports.forget_password = function(req, res) {
  res.render("customer-views/forget-password", { title: "Quên mật khẩu" });
};

exports.reset_password = function(req, res) {
  res.render("customer-views/reset-password", { title: "Thay đổi mật khẩu" });
};

exports.change_password = function(req, res) {
  res.render("customer-views/change-password", { title: "Đổi mật khẩu" });
};
exports.update_infor = function(req, res) {
  // res.locals.user = req.cookies.user;
  // console.log('3 req.user is: ', req.user);
  // console.log('user before go to update infor: ', req.cookies.user);
  res.render("customer-views/update-infor", { title: "Thay đổi thông tin" });
};

exports.post_signin = async function(req, res) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log("login failed");
      res.send({
        message: "Something is not right",
        success: false
      });
    } else {
      req.login(user, err => {
        if (err) {
          res.send({ success: false });
        }
        // generate a signed son web token with the contents of user object and return it in the response
        var token = jwt.sign({ user }, config.secret, {
          expiresIn: 86400 // 1 day
        });
        res.cookie("token", token);
        res.cookie("user", user);
        res.locals.user = req.cookies.user;
        console.log("login success");
        res.send({ success: true });
      });
    }
  })(req, res);
};

exports.post_signup = async function(req, res) {
  if (
    !req.body.name ||
    !req.body.password ||
    req.body.repassword != req.body.password
  ) {
    res.render("customer-views/signup", {
      title: "Đăng ký thất bại",
      message: "Điền thông tin chưa chính xác"
    });
  } else {
    User.findOne({ email: req.body.email }, (err, results) => {
      if (results != null) {
        res.render("customer-views/signup", {
          title: "Đăng ký thất bại",
          message: `Email ${
            req.body.email
          } đã tồn tại. Vui lòng đăng ký tài khoản bằng email khác.`
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
        req.login(user, { session: false }, err => {
          if (err) {
            res.send(err);
          }
          // generate a signed son web token with the contents of user object and return it in the response
          var token = jwt.sign({ user }, config.secret, {
            expiresIn: 86400 // 1 day
          });
          res.cookie("token", token);
          res.cookie("user", user);
          console.log("sign up successfully!");
          res.render("customer-views/update-infor", {
            title: "Thay đổi thông tin",
            message: "Đăng ký thành công",
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
  console.log("on logout");
  req.logout();
  res.clearCookie("user");
  res.clearCookie("token");
  res.send({ success: true });
};

exports.isLogin = function(req, res, next) {
  console.log("is authen 3: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send({
      message: "Bạn cần đăng nhập để thực hiện chức năng này."
    });
  }
};

exports.post_forget_password = function(req, res) {
  async.waterfall(
    [
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, account) {
          if (account) {
            done(err, account);
          } else {
            done("Tài khoản không tìm thấy.");
          }
        });
      },
      function(account, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString("hex");
          done(err, account, token);
        });
      },
      function(account, token, done) {
        User.findByIdAndUpdate(
          { _id: account._id },
          {
            reset_password_token: token,
            reset_password_expires: Date.now() + 86400000
          },
          {
            upsert: true,
            new: true
          }
        ).exec(function(err, new_account) {
          done(err, token, new_account);
        });
      },
      function(token, account, done) {
        console.log("headers", req.headers.host);
        const url =
          "https://" + req.headers.host + "/reset-password?token=" + token;
        var mainOptions = {
          from: "tranphunguyen111@gmail.com",
          to: account.email,
          subject: "Thay đổi mật khẩu",
          html:
            "<div><h3>Xin chào " +
            account.name +
            "</h3><p> Nhấn vào link " +
            url +
            " để tạo lại mật khẩu</p>"
        };
        transporter.sendMail(mainOptions, function(err) {
          if (!err) {
            console.log("main Otiopnsdfsdf", mainOptions.subject);
            return res.json({
              message: "Mời bạn kiểm tra mail để tạo mật khẩu mới!!"
            });
          } else {
            return done(err);
          }
        });
      }
    ],
    function(err) {
      return res.status(422).json({ message: err });
    }
  );
};
