exports.checkout = function(req, res) {
  res.render("customer-views/checkout", { title: "Giỏ hàng" });
};
//todo
exports.checkout_post = function(req, res) {
  res.render("customer-views/checkout", { title: "Giỏ hàng" });
};
exports.payment = function(req, res) {
  res.render("customer-views/payment", { title: "Thanh toán" });
};
exports.payment_post = function(req, res) {
  res.render("customer-views/payment", { title: "Thanh toán" });
};
exports.product = function(req, res) {
  res.render("customer-views/product", { title: "Sản phẩm" });
};
exports.shop = function(req, res) {
  res.render("customer-views/shop", { title: "Cửa hàng" });
};
exports.single = function(req, res) {
  const name = "Gấu teddy";
  res.render("customer-views/single", {
    title: "Chi tiết sản phẩm",
    nameProduct: name
  });
};
exports.single_post = function(req, res) {
  //post method when add a comment
  //todo
  const name = "Gấu teddy";
  res.render("customer-views/single", {
    title: "Chi tiết sản phẩm",
    nameProduct: name
  });
};
exports.detail_receipt = function(req, res) {
  res.render("customer-views/detail-receipt", { title: "Chi tiết hóa đơn" });
};
exports.history = function(req, res) {
  res.render("customer-views/history", { title: "Lịch sử mua hàng" });
};
