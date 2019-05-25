var express = require('express');
var router = express.Router();
var shopping_controller = require('../controllers/shoppingControllers');
var account_controller = require('../controllers/accountController');
var information_controller = require('../controllers/informationController');

router.get('/', information_controller.index);
router.get('/index', information_controller.index);
router.get('/about', information_controller.about);
router.get('/contact', information_controller.contact);
router.get('/service', information_controller.service);
router.get('/404', information_controller.not_found_404);

router.get('/checkout', shopping_controller.checkout);
router.post('/checkout', shopping_controller.checkout_post);
router.get('/payment', shopping_controller.payment);
router.post('/payment', shopping_controller.payment_post);
// router.get("/product", shopping_controller.product);
router.get('/product-barbie', shopping_controller.product_barbie);
router.get('/product-car', shopping_controller.product_car);
router.get('/product-bear', shopping_controller.product_bear);
router.get('/product-other', shopping_controller.product_other);
router.get('/shop', shopping_controller.shop);
//TODO: add id
router.get('/single/:id', shopping_controller.single);
// router.get("/single", shopping_controller.single);
router.post('/single', shopping_controller.single_post);
router.get('/detail-receipt', shopping_controller.detail_receipt);
router.get('/history', shopping_controller.history);

router.post('/signin', account_controller.post_signin);
router.get('/signup', account_controller.signup);
router.post('/signup', account_controller.post_signup);
// router.post('/signin', account_controller.signup);
router.get('/forget-password', account_controller.forget_password);
router.get('/change-password', account_controller.change_password);
router.get('/update-infor', account_controller.update_infor);

//TODO: this block of code is demo
const Product = require('../model/product');
const Type = require('../model/type');
router.post('/test', function(req, res, next) {
	const product = {
		name: 'Test name product 1'
	};
	const model = new Product(product);
	model.save();

	const addnew = Product.find({}, (err, result) => {
		res.json({
			header: 'success',
			result
		});
	});
});
router.get('/test', function(req, res, next) {
	const addnew = Product.find({}, (err, result) => {
		res.json({
			header: 'success get product',
			result
		});
	});
});
module.exports = router;
