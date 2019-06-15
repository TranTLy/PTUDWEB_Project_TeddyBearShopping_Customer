// const { db } = require("../dbs/index");
// const { productsDb } = require("../models/products");
var ObjectId = require('mongodb').ObjectID;
const Type = require('../model/type');
const Product = require('../model/product');
const Constants = require('../constants');

exports.checkout = function(req, res) {
	res.locals.cartShop = req.session.cartShop;
	// console.log('cart in checkout: ');
	// req.session.destroy();
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

	res.render('customer-views/shop', {
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
			return result;
		});
	}

	res.render('customer-views/shop', {
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

	res.render('customer-views/shop', {
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

	res.render('customer-views/shop', {
		title: 'Gấu bông',
		link: 'product-bear',
		products: db,
		standOutProducts: db.filter((item, index) => item.isStandOut == true),
		typeProduct: type
	});
};
exports.shop = async function(req, res) {
	const type = await Type.find({}, (err, type) => {
		if (err) {
			return next(err);
		} else {
			return type;
		}
	});

	const sum = await getSumQuantityProduct();
	const sumPage = Math.ceil(sum * 1.0 / Constants.LIMIT_PRODUCT_PER_PAGE);
	let page = 1;
	if (req.query.page) {
		page = req.query.page;
	}
	if (page < 1) {
		page = 1;
	} else if (page > sumPage) {
		page = sumPage;
	}
	let paging = getPaging(sumPage, page, '/shop');

	console.log('paging: ', paging);
	console.log('current page: ', page);
	const db = await Product.find({})
		.limit(Constants.LIMIT_PRODUCT_PER_PAGE)
		.skip((page - 1) * Constants.LIMIT_PRODUCT_PER_PAGE)
		.sort({ name: 1 });
	if (db) {
		// console.log('db Test length: ', db.length, 'database test: ', db);
		res.render('customer-views/shop', {
			title: 'Cửa hàng',
			link: '',
			products: db,
			standOutProducts: db.filter((item, index) => item.isStandOut == true),
			typeProduct: type,
			paging,
			currentPage: page
		});
	}

	// const db = await Product.find({}, function(err, db) {
	// 	if (err) {
	// 		return next(err);
	// 	} else {
	// 		res.render('customer-views/shop', {
	// 			title: 'Cửa hàng',
	// 			products: db,
	// 			standOutProducts: db.filter((item, index) => item.isStandOut == true),
	// 			typeProduct: type
	// 		});
	// 	}
	// });
};
exports.single = async function(req, res) {
	const singleProduct = await Product.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
		return result;
	});

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

exports.addToCart = async (req, res) => {
	const id = req.query.id;
	await Product.findById(id, (err, product) => {
		if (!req.session.cartShop) {
			req.session.cartShop = [];
			// console.log('cart in session empty: ', req.session.cartShop);
			req.session.cartShop.push({ ...product._doc, quantity: 1 });
		} else {
			const index = req.session.cartShop.findIndex((item) => item._id === id);

			if (index == -1) {
				//have not had in cart shop
				req.session.cartShop.push({ ...product._doc, quantity: 1 });
			} else {
				req.session.cartShop[index].quantity++;
			}
			console.log('length cart after: ', req.session.cartShop.length);
		}
		res.send({ isSuccessful: true });
	});

	// });
};

exports.changeQuantity = (req, res) => {
	const id = req.query.id;
	const quantity = req.query.quantity;
	console.log('id: ' + id, 'quan: ', quantity);

	const index = req.session.cartShop.findIndex((item) => item._id === id);
	if (index != -1) {
		req.session.cartShop[index].quantity = quantity;
		res.send({ isSuccessful: true });
	} else {
		res.send({ isSuccessful: false });
	}
};

//delete 1 product from cartShop
exports.deleteFromCart = (req, res) => {
	const id = req.query.id;

	const index = req.session.cartShop.findIndex((item) => item._id === id);
	if (index != -1) {
		req.session.cartShop = [ ...req.session.cartShop.filter((item) => item._id !== id) ];
		res.send({ isSuccessful: true });
	} else {
		res.send({ isSuccessful: false });
	}
};

getSumQuantityProduct = async () => {
	const sum = await Product.find({ isDeleted: false }).countDocuments();
	return sum;
};

getPaging = (sumPage, currentPage, link) => {
	let paging = [];
	if (sumPage <= Constants.LIMIT_PRODUCT_PER_PAGE_NUMBER_PAGE) {
		for (let i = 0; i < sumPage; i++) {
			paging.push({
				name: i + 1,
				link: link + '?page=' + i
			});
		}
	} else {
		if (currentPage <= 2) {
			//at first session
			for (let i = 1; i <= 3; i++) {
				paging.push({
					name: i,
					link: link + '?page=' + i,
					isNumber: true
				});
			}
			// paging.push({
			// 	name: "...",
			// 	link: ""
			// })
			paging.push({
				name: 'Trang tiếp',
				link: link + '?page=' + (parseInt(currentPage) + 1),
				isNumber: false
			});
			paging.push({
				name: 'Trang cuối',
				link: link + '?page=' + sumPage,
				isNumber: false
			});
		} else if (currentPage >= sumPage - 2) {
			//at last session
			paging.push({
				name: 'Trang đầu',
				link: link + '?page=1',
				isNumber: false
			});
			paging.push({
				name: 'Trang trước',
				link: link + '?page=' + (currentPage - 1),
				isNumber: false
			});
			// paging.push({
			// 	name: "...",
			// 	link: ""
			// })
			for (let i = sumPage - 2; i <= sumPage; i++) {
				paging.push({
					name: i,
					link: link + '?page=' + i,
					isNumber: true
				});
			}
		} else {
			//other session
			paging.push({
				name: 'Trang đầu',
				link: link + '?page=1',
				isNumber: false
			});
			paging.push({
				name: 'Trang trước',
				link: link + '?page=' + (currentPage - 1),
				isNumber: false
			});

			paging.push({
				name: currentPage - 1,
				link: link + '?page=' + (currentPage - 1),
				isNumber: true
			});
			paging.push({
				name: parseInt(currentPage),
				link: link + '?page=' + currentPage,
				isNumber: true
			});
			paging.push({
				name: parseInt(currentPage) + 1,
				link: link + '?page=' + (parseInt(currentPage) + 1),
				isNumber: true
			});

			paging.push({
				name: 'Trang tiếp',
				link: link + '?page=' + (parseInt(currentPage) + 1),
				isNumber: false
			});
			paging.push({
				name: 'Trang cuối',
				link: link + '?page=' + sumPage,
				isNumber: false
			});
		}
	}
	return paging;
};
