// const { db } = require("../dbs/index");
// const { productsDb } = require("../models/products");
const {
	getProducts,
	getBearProduct,
	getBarbiePoduct,
	getCarProduct,
	getOtherProduct,
	getSingleProduct
} = require('../models/products');
const { getType } = require('../models/type');

exports.checkout = function(req, res) {
	res.render('customer-views/checkout', { title: 'Giỏ hàng' });
};
//todo
exports.checkout_post = function(req, res) {
	res.render('customer-views/checkout', { title: 'Giỏ hàng' });
};
exports.payment = function(req, res) {
	res.render('customer-views/payment', { title: 'Thanh toán' });
};
exports.payment_post = function(req, res) {
	res.render('customer-views/payment', { title: 'Thanh toán' });
};
exports.product_other = async function(req, res) {
	// console.log('other: ', JSON.stringify(productDb));
	const db = await getOtherProduct();
	const type = await getType();
	console.log('my product: ', db);
	res.render('customer-views/product', {
		title: 'Đồ chơi khác',
		link: 'product-other',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};

exports.product_barbie = async function(req, res) {
	// console.log("barbie: " + JSON.stringify(productBarbie));
	const db = await getBarbiePoduct();
	const type = await getType();

	res.render('customer-views/product', {
		title: 'Búp bê barbie',
		link: 'product-barbie',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};
exports.product_car = async function(req, res) {
	console.log('CAR: ' + JSON.stringify(productCar));
	const db = await getCarProduct();
	const type = await getType();

	res.render('customer-views/product', {
		title: 'Xe đồ chơi',
		link: 'product-car',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};
exports.product_bear = async function(req, res) {
	const db = await getBearProduct();
	const type = await getType();

	res.render('customer-views/product', {
		title: 'Gấu bông',
		link: 'product-bear',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};
exports.shop = async function(req, res) {
	const db = await getProducts();
	const type = await getType();
	res.render('customer-views/shop', {
		title: 'Cửa hàng',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};
exports.single = async function(req, res) {
	const id = req.params.id;
	const singleProduct = await getSingleProduct(id);
	console.log('single product: ', singleProduct);

	const name = 'Gấu teddy';
	res.render('customer-views/single', {
		title: 'Chi tiết sản phẩm',
		nameProduct: 'abc',
		product: singleProduct
	});
};
exports.single_post = function(req, res) {
	//post method when add a comment
	//todo
	const name = 'Gấu teddy';
	res.render('customer-views/single', {
		title: 'Chi tiết sản phẩm',
		nameProduct: name
	});
};
exports.detail_receipt = function(req, res) {
	res.render('customer-views/detail-receipt', { title: 'Chi tiết hóa đơn' });
};
exports.history = function(req, res) {
	res.render('customer-views/history', { title: 'Lịch sử mua hàng' });
};
