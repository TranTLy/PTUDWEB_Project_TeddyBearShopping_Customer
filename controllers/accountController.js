exports.signup = function(req, res) {
  res.render("customer-views/signup", { title: "Đăng ký" });
};
exports.forget_password = function(req, res) {
  res.render("customer-views/forget-password", { title: "Quên mật khẩu" });
};
exports.change_password = function(req, res) {
  res.render("customer-views/change-password", { title: "Đổi mật khẩu" });
};
exports.update_infor = function(req, res) {
  res.render("customer-views/update-infor", { title: "Thay đổi thông tin" });
};
