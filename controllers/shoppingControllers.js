// const { db } = require("../dbs/index");
// const { productsDb } = require("../models/products");
var ObjectId = require('mongodb').ObjectID;
const Type = require('../model/type');
const Comment = require('../model/comment');
const Product = require('../model/product');
const Constants = require('../constants');
const typeProducts = null;

getTypeProduct = async () => {
	if (!typeProducts) {
		typeProducts = await Type.find({}, (err, type) => {
			if (err) {
				return next(err);
			} else {
				return type;
			}
		});
	}
	return typeProducts;
};
getComment = async (idProduct) => {
	await Comment.find({ idProduct }, (err, result) => {
		if (err) {
			return [];
		} else {
			console.log('comment: ', result);
			return result;
		}
	});
};

exports.checkout = function(req, res) {
	res.locals.cartShop = req.session.cartShop;
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
exports.shop = async function(req, res) {
	//get type
	const type = await Type.find({}, (err, type) => {
		if (err) {
			return next(err);
		} else {
			return type;
		}
	});

	let typeId = '';
	var title = 'Cửa hàng';
	if (req.query.type) {
		typeId = req.query.type;
		const temp = await Type.findById(typeId);
		if (temp) {
			title = temp.name;
		}
	}

	const sum = await getSumQuantityProduct(typeId);
	const sumPage = Math.ceil(sum * 1.0 / Constants.LIMIT_PRODUCT_PER_PAGE);
	let page = 1;
	if (req.query.page) {
		page = req.query.page;
	}
	if (page < 1 || sumPage === 0) {
		page = 1;
	} else if (page > sumPage) {
		page = sumPage;
	}
	let paging;
	let db;
	if (typeId !== '') {
		paging = getPaging(sumPage, page, '/shop?type=' + typeId + '&');
		db = await Product.find({ type: typeId })
			.limit(Constants.LIMIT_PRODUCT_PER_PAGE)
			.skip((page - 1) * Constants.LIMIT_PRODUCT_PER_PAGE)
			.sort({ name: 1 });
	} else {
		paging = getPaging(sumPage, page, '/shop?');
		db = await Product.find({})
			.limit(Constants.LIMIT_PRODUCT_PER_PAGE)
			.skip((page - 1) * Constants.LIMIT_PRODUCT_PER_PAGE)
			.sort({ name: 1 });
	}
	if (db) {
		res.render('customer-views/shop', {
			title,
			link: typeId !== '' ? 'shop?type=' + typeId : '',
			products: db,
			standOutProducts: db.filter((item, index) => item.isStandOut == true),
			typeProduct: type,
			paging,
			currentPage: page
		});
	}
};
exports.single = async function(req, res) {
	typeProduct = await Type.find({}, (err, type) => {
		if (err) {
			return next(err);
		} else {
			return type;
		}
	});
	const comments = await Comment.find({ idProduct: req.query.id }, (err, result) => {
		if (err) {
			return [];
		} else {
			return result;
		}
	});
	console.log('comment: ', comments);
	const singleProduct = await Product.findOne({ _id: ObjectId(req.query.id) }, (err, result) => {
		return result;
	});

	const sum = await getSumQuantityProduct(singleProduct.type);
	const sumPage = Math.ceil(sum * 1.0 / Constants.LIMIT_RELATED_PRODUCT);
	let currentPage = 1;
	if (req.query.page) {
		currentPage = req.query.page;
	}
	if (currentPage < 1 || sumPage === 0) {
		currentPage = 1;
	} else if (currentPage > sumPage) {
		currentPage = sumPage;
	}
	console.log('sum product: ', sum, 'sum page: ', sumPage, 'current: ', currentPage);
	const relatedProduct = await Product.find({ type: singleProduct.type })
		.limit(Constants.LIMIT_RELATED_PRODUCT)
		.skip((currentPage - 1) * Constants.LIMIT_RELATED_PRODUCT)
		.sort({ name: 1 });

	const paging = getPaging(sumPage, currentPage, '/single?id=' + singleProduct._id + '&');

	res.render('customer-views/single', {
		title: 'Chi tiết sản phẩm',
		typeProduct,
		product: singleProduct,
		products: relatedProduct,
		paging,
		currentPage,
		pagingComment: [],
		comments
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

getSumQuantityProduct = async (typeId) => {
	let sum;
	if (typeId !== '') {
		sum = await Product.find({ isDeleted: false, type: typeId }).countDocuments();
	} else {
		sum = await Product.find({ isDeleted: false }).countDocuments();
	}
	return sum;
};

getPaging = (sumPage, currentPage, link) => {
	let paging = [];
	if (sumPage <= Constants.LIMIT_PAGE_NUMBER) {
		for (let i = 1; i <= sumPage; i++) {
			paging.push({
				name: i,
				link: link + 'page=' + i,
				isNumber: true
			});
		}
	} else {
		if (currentPage <= 2) {
			//at first session
			for (let i = 1; i <= 3; i++) {
				paging.push({
					name: i,
					link: link + 'page=' + i,
					isNumber: true
				});
			}
			// paging.push({
			// 	name: "...",
			// 	link: ""
			// })
			paging.push({
				name: 'Trang tiếp',
				link: link + 'page=' + (parseInt(currentPage) + 1),
				isNumber: false
			});
			paging.push({
				name: 'Trang cuối',
				link: link + 'page=' + sumPage,
				isNumber: false
			});
		} else if (currentPage >= sumPage - 2) {
			//at last session
			paging.push({
				name: 'Trang đầu',
				link: link + 'page=1',
				isNumber: false
			});
			paging.push({
				name: 'Trang trước',
				link: link + 'page=' + (currentPage - 1),
				isNumber: false
			});
			// paging.push({
			// 	name: "...",
			// 	link: ""
			// })
			for (let i = sumPage - 2; i <= sumPage; i++) {
				paging.push({
					name: i,
					link: link + 'page=' + i,
					isNumber: true
				});
			}
		} else {
			//other session
			paging.push({
				name: 'Trang đầu',
				link: link + 'page=1',
				isNumber: false
			});
			paging.push({
				name: 'Trang trước',
				link: link + 'page=' + (currentPage - 1),
				isNumber: false
			});

			paging.push({
				name: currentPage - 1,
				link: link + 'page=' + (currentPage - 1),
				isNumber: true
			});
			paging.push({
				name: parseInt(currentPage),
				link: link + 'page=' + currentPage,
				isNumber: true
			});
			paging.push({
				name: parseInt(currentPage) + 1,
				link: link + 'page=' + (parseInt(currentPage) + 1),
				isNumber: true
			});

			paging.push({
				name: 'Trang tiếp',
				link: link + 'page=' + (parseInt(currentPage) + 1),
				isNumber: false
			});
			paging.push({
				name: 'Trang cuối',
				link: link + 'page=' + sumPage,
				isNumber: false
			});
		}
	}
	return paging;
};
