var express = require("express");
var router = express.Router();
var shopping_controller = require("../controllers/shoppingControllers");
var account_controller = require("../controllers/accountController");
var information_controller = require("../controllers/informationController");

router.get("/", information_controller.index);
router.get("/index", information_controller.index);
router.get("/about", information_controller.about);
router.get("/contact", information_controller.contact);
router.get("/service", information_controller.service);
router.get("/404", information_controller.not_found_404);

router.get("/checkout", shopping_controller.checkout);
router.post("/checkout", shopping_controller.checkout_post);
router.get("/payment", shopping_controller.payment);
router.post("/payment", shopping_controller.payment_post);
router.get("/product", shopping_controller.product);
router.get("/shop", shopping_controller.shop);
//TODO: add id
router.get("/single", shopping_controller.single);
router.post("/single", shopping_controller.single_post);
router.get("/detail-receipt", shopping_controller.detail_receipt);
router.get("/history", shopping_controller.history);

router.get("/signup", account_controller.signup);
router.get("/forget-password", account_controller.forget_password);
router.get("/change-password", account_controller.change_password);
router.get("/update-infor", account_controller.update_infor);

module.exports = router;
