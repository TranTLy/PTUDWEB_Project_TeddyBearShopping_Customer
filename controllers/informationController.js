exports.index = function(req, res) {
  res.render("customer-views/index", { title: "Trang chủ" });
};
exports.about = function(req, res) {
  res.render("customer-views/about", { title: "Giới thiệu" });
};
exports.contact = function(req, res) {
  res.render("customer-views/contact", { title: "Liên hệ" });
};
exports.service = function(req, res) {
  res.render("customer-views/service", { title: "Dịch vụ" });
};
exports.not_found_404 = function(req, res) {
  res.render("customer-views/404-not-found", { title: "Không tìm thấy" });
};
