var express = require("express");
var router = express.Router();
var shopping_controller = require('../controllers/shoppingControllers');
var account_controller = require('../controllers/accountController');
var information_controller = require('../controllers/informationController');

router.get('/', shopping_controller.getTypeProduct, information_controller.index);
router.get('/index', shopping_controller.getTypeProduct, information_controller.index);
router.get('/about', shopping_controller.getTypeProduct, information_controller.about);
router.get('/contact', shopping_controller.getTypeProduct, information_controller.contact);
router.get('/service', shopping_controller.getTypeProduct, information_controller.service);
router.get('/404', shopping_controller.getTypeProduct, information_controller.not_found_404);

router.get('/checkout', shopping_controller.getTypeProduct, shopping_controller.checkout);
router.post('/checkout', shopping_controller.checkout_post);
router.get('/payment', shopping_controller.getTypeProduct, shopping_controller.payment);
router.post('/payment-post', shopping_controller.getTypeProduct, account_controller.isLogin, account_controller.isAuthenUser, shopping_controller.payment_post);
// router.get("/product", shopping_controller.product);
// router.get('/product-barbie', shopping_controller.product_barbie);
// router.get('/product-car', shopping_controller.product_car);
// router.get('/product-bear', shopping_controller.product_bear);
// router.get('/product-other', shopping_controller.product_other);
router.get('/shop', shopping_controller.getTypeProduct, shopping_controller.shop);
router.get('/paging/shop', shopping_controller.getTypeProduct, shopping_controller.pagingShop);
router.get('/addToCart', shopping_controller.getTypeProduct, shopping_controller.addToCart);
router.post('/changeQuantity', shopping_controller.changeQuantity);
router.post('/deleteFromCart', shopping_controller.deleteFromCart);
router.post('/search', shopping_controller.search);
router.post('/searchAdvanced', shopping_controller.searchAdvanced);
router.get('/searchAdvanced', shopping_controller.getTypeProduct, shopping_controller.searchAdvanced);

//TODO: add id
router.get('/single', shopping_controller.getTypeProduct, shopping_controller.single);
router.post('/single', shopping_controller.single_post);
router.get('/detail-receipt', shopping_controller.getTypeProduct, shopping_controller.detail_receipt);
router.get('/history', shopping_controller.getTypeProduct, account_controller.isLogin, shopping_controller.history);

router.post('/signin', account_controller.post_signin);
router.get('/signup', shopping_controller.getTypeProduct, account_controller.signup);
router.post('/postComment', shopping_controller.post_comment);

router.post('/signup', account_controller.post_signup);
router.post('/signout', account_controller.signout);
router.get(
    "/forget-password",
    shopping_controller.getTypeProduct,
    account_controller.isLogin,
    account_controller.forget_password
);
router.post(
    "/forget-password",
    account_controller.isLogin,
    account_controller.post_forget_password
);
router.get(
    "/change-password",
    shopping_controller.getTypeProduct,
    account_controller.isLogin,
    account_controller.change_password
);

router.post(
    "/change-password",
    account_controller.isLogin,
    account_controller.post_change_password
);

router.get(
    "/reset-password",
    shopping_controller.getTypeProduct,
    account_controller.isLogin,
    account_controller.reset_password
);
router.post(
    "/reset-password",
    account_controller.isLogin,
    account_controller.post_reset_password
);

router.get("/infor", shopping_controller.getTypeProduct, account_controller.infor);
router.get(
    "/update-infor",
    shopping_controller.getTypeProduct,
    account_controller.isLogin,
    account_controller.update_infor
);

router.post("/authenticate", account_controller.post_authenticate);
router.get(
    "/update-infor",
    shopping_controller.getTypeProduct,
    account_controller.isLogin,
    account_controller.update_infor
);
router.post(
    "/update-infor",
    account_controller.post_update_infor
);
router.get(
    "/change-password/checkpass",
    shopping_controller.getTypeProduct,
    account_controller.isLogin,
    account_controller.checkpassword
);


router.post("/checkEmail", account_controller.checkEmail);

module.exports = router;
