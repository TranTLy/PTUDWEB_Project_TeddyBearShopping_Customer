// const { db } = require("../dbs/index");
// const { productsDb } = require("../models/products");
var ObjectId = require('mongodb').ObjectID;
const Type = require('../model/type');
const Product = require('../model/product');

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
	const type = await Type.find({}, (err, result) => {
		return result;
	});
	const customType = type.filter((item) => item.name == 'Khác')[0];

	let db = [];
	if (type != null) {
		db = await Product.find({ type: customType._id }, (err, result) => {
			return result;
		});
	}

	res.render('customer-views/product', {
		title: 'Đồ chơi khác',
		link: 'product-other',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};

exports.product_barbie = async function(req, res) {
	const type = await Type.find({}, (err, result) => {
		return result;
	});
	const customType = type.filter((item) => item.name == 'Búp bê')[0];

	let db = [];
	if (type != null) {
		db = await Product.find({ type: customType._id }, (err, result) => {
			console.log('barbie: ', result);
			return result;
		});
	}

	res.render('customer-views/product', {
		title: 'Búp bê barbie',
		link: 'product-barbie',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};
exports.product_car = async function(req, res) {
	const type = await Type.find({}, (err, result) => {
		return result;
	});
	const customType = type.filter((item) => item.name == 'Xe đồ chơi')[0];

	let db = [];
	if (type != null) {
		db = await Product.find({ type: customType._id }, (err, result) => {
			return result;
		});
	}

	res.render('customer-views/product', {
		title: 'Xe đồ chơi',
		link: 'product-car',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};
exports.product_bear = async function(req, res) {
	const type = await Type.find({}, (err, result) => {
		return result;
	});
	const customType = type.filter((item) => item.name == 'Gấu bông')[0];

	let db = [];
	if (type != null) {
		db = await Product.find({ type: customType._id }, (err, result) => {
			return result;
		});
	}

	res.render('customer-views/product', {
		title: 'Gấu bông',
		link: 'product-bear',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};
exports.shop = async function(req, res) {
	//const db = await getProducts();
	// const type = await getType();
	const type = await Type.find({}, (err, type) => {
		if (err) {
			return next(err);
		} else {
			console.log('my type: ', type);
			return type;
		}
	});
	const db = await Product.find({}, function(err, db) {
		if (err) {
			return next(err);
		} else {
			//return products;
			//console.log('my product from mongosee: ', db);
			res.render('customer-views/shop', {
				title: 'Cửa hàng',
				products: db,
				standOutProducts: db.filter((item, index) => item.isStandOut == true),
				typeProduct: type
			});
		}
	});
};
exports.single = async function(req, res) {
	const singleProduct = await Product.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
		return result;
	});
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
