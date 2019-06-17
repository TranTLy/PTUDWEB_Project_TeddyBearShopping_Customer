// const { db } = require("../dbs/index");
// const { productsDb } = require("../models/products");
var ObjectId = require('mongodb').ObjectID;
const Type = require('../model/type');
const Comment = require('../model/comment');
const Product = require('../model/product');
const Origin = require('../model/origin.model');
const Producer = require('../model/producer.model');
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
			return result;
		}
	});
};

exports.checkout = function (req, res) {
	res.locals.cartShop = req.session.cartShop;
	res.render('customer-views/checkout', { title: 'Giỏ hàng' });
};
//todo
exports.checkout_post = function (req, res) {
	res.render('customer-views/checkout', { title: 'Giỏ hàng' });
};
exports.payment = function (req, res) {
	res.render('customer-views/payment', { title: 'Thanh toán' });
};
exports.payment_post = function (req, res) {
	res.render('customer-views/payment', { title: 'Thanh toán' });
};

getConditionShowProduct = (conditionShow) => {
	// console.log('on get sort: ', conditionShow);
	let result = [...Constants.CONDITION_SORT_PRODUCT];
	console.log('result before: ', result);
	// switch (parseInt(conditionShow)) {
	// 	case Constants.NAME_PRODUCT_ASC:
	// 		console.log('on get result 0');
	// 		result[0].sort = 1;
	// 		return result[0]
	// 		break;
	// 	case Constants.NAME_PRODUCT_DES:
	// 		console.log('on get result 1');
	// 		result[0].sort = -1;
	// 		break;
	// 	case Constants.PRICE_PRODUCT_ASC:
	// 		console.log('on get result 2');
	// 		result[1].sort = 1;
	// 		break;
	// 	case Constants.PRICE_PRODUCT_DES:
	// 		console.log('on get result 3');
	// 		result[1].sort = -1;
	// 		console.log('result sort in 3: ', result);
	// 		break;
	// 	case Constants.DISCOUNT_PRODUCT_ASC:
	// 		console.log('on get result 4');
	// 		result[2].sort = 1;
	// 		break;
	// 	case Constants.DISCOUNT_PRODUCT_DES:
	// 		console.log('on get result 5');
	// 		result[2].sort = -1;
	// 		break;
	// 	default:
	// 		// console.log('on default:');
	// 		break;
	// }
	switch (parseInt(conditionShow)) {
		case Constants.NAME_PRODUCT_ASC:
			console.log('on get result 0');
			result[0].sort = 1;
			break;
		case Constants.NAME_PRODUCT_DES:
			console.log('on get result 1');
			result[0].sort = -1;
			break;
		case Constants.PRICE_PRODUCT_ASC:
			console.log('on get result 2');
			result[1].sort = 1;
			break;
		case Constants.PRICE_PRODUCT_DES:
			console.log('on get result 3');
			result[1].sort = -1;
			console.log('result sort in 3: ', result);
			break;
		case Constants.DISCOUNT_PRODUCT_ASC:
			console.log('on get result 4');
			result[2].sort = 1;
			break;
		case Constants.DISCOUNT_PRODUCT_DES:
			console.log('on get result 5');
			result[2].sort = -1;
			break;
		default:
			// console.log('on default:');
			break;
	}
	console.log('result sort: ', result[parseInt(conditionShow / 2)]);
	return result[parseInt(conditionShow / 2)];
};
exports.shop = async function (req, res) {
	console.log('on shop controller');
	//get type
	const type = await Type.find({}, (err, type) => {
		if (err) {
			return next(err);
		} else {
			return type;
		}
	});
	//get origin table
	const origin = await Origin.find({});
	//get producer table
	const producer = await Producer.find({});

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
	console.log('req.query.show', req.query.show);
	const conditionShow = req.query.show || 0;
	const conditionShowObject = { ...getConditionShowProduct(parseInt(conditionShow)) }
	console.log("object: ", conditionShowObject);
	const sortName = conditionShowObject.name;
	const sortValue = conditionShowObject.sort;
	const sortTest = {

	}
	sortTest[sortName] = sortValue;
	console.log("sort test", sortTest);
	console.log('condition show:', sortName, sortValue);

	let paging;
	let db;
	if (typeId !== '') {
		paging = getPaging(sumPage, page, '/shop?type=' + typeId + '&show=' + conditionShow + '&');
		db = await Product.find({ type: typeId })
			.limit(Constants.LIMIT_PRODUCT_PER_PAGE)
			.skip((page - 1) * Constants.LIMIT_PRODUCT_PER_PAGE)
		// .sort({
		// 	name: conditionShowArray[0].sort,
		// 	price: conditionShowArray[1].sort,
		// 	discount: conditionShowArray[2].sort
		// });
		// .sort({
		// 	discount: -1
		// });
	} else {
		paging = getPaging(sumPage, page, '/shop?show=' + conditionShow + '&');

		db = await Product.find({})
			.sort(
				sortTest
				// {
				// 	price: 1
				// }
			)
			.limit(Constants.LIMIT_PRODUCT_PER_PAGE)
			.skip((page - 1) * Constants.LIMIT_PRODUCT_PER_PAGE)
		// .sort({
		// 	name: parseInt(conditionShowArray[0].sort),
		// 	price: parseInt(conditionShowArray[1].sort),
		// 	discount: parseInt(conditionShowArray[2].sort)
		// });

		// .sort({
		// 	name: conditionShowArray[0].sort,
		// 	price: conditionShowArray[1].sort,
		// 	discount: conditionShowArray[2].sort
		// });
	}
	if (db) {
		res.render('customer-views/shop', {
			title,
			link: typeId !== '' ? 'shop?type=' + typeId : '',
			products: db,
			standOutProducts: db.filter((item, index) => item.isStandOut == true),
			typeProduct: type,
			paging,
			currentPage: page,
			origin,
			producer,
			sum,
			show: conditionShow
		});
	}
};
exports.single = async function (req, res) {
	typeProduct = await Type.find({}, (err, type) => {
		if (err) {
			return next(err);
		} else {
			return type;
		}
	});
	const singleProduct = await Product.findOne({ _id: ObjectId(req.query.id) }, (err, result) => {
		if (err) {
			return next(err);
		}
		return result;
	});

	//paging related product
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
	const paging = getPaging(sumPage, currentPage, '/single?id=' + singleProduct._id + '&');

	console.log('sum product: ', sum, 'sum page: ', sumPage, 'current: ', currentPage);
	//--paging comment
	const sumComment = await getSumComment(req.query.id);
	const sumPageComment = Math.ceil(sumComment * 1.0 / Constants.LIMIT_COMMENT);
	let currentPageComment = 1;
	if (req.query.commentpage) {
		currentPageComment = req.query.commentpage;
	}
	if (currentPageComment < 1 || sumPageComment === 0) {
		currentPageComment = 1;
	} else if (currentPageComment > sumPageComment) {
		currentPageComment = sumPageComment;
	}
	console.log('Comment: sum: ', sumComment, 'sum page: ', sumPageComment, 'current: ', currentPageComment);
	const pagingComment = getPaging(sumPageComment, currentPageComment, '/single?id=' + singleProduct._id + '&comment');
	//--end paging comment
	const relatedProduct = await Product.find({ type: singleProduct.type })
		.limit(Constants.LIMIT_RELATED_PRODUCT)
		.skip((currentPage - 1) * Constants.LIMIT_RELATED_PRODUCT)
		.sort({ name: 1 });

	await Comment.find({ idProduct: req.query.id })
		.populate('idUser')
		.limit(Constants.LIMIT_COMMENT)
		.skip((currentPageComment - 1) * Constants.LIMIT_COMMENT)
		.sort({ time: -1 })
		.exec((err, comments) => {
			if (err) {
				return [];
			} else {
				// console.log('comment in single: ', comments);
				// return result;

				res.render('customer-views/single', {
					title: 'Chi tiết sản phẩm',
					typeProduct,
					product: singleProduct,
					products: relatedProduct,
					paging,
					currentPage,
					currentPageComment,
					pagingComment,
					comments
				});
			}
		});
};
exports.single_post = function (req, res) {
	//post method when add a comment
	//todo
	const name = 'Gấu teddy';
	res.render('customer-views/single', {
		title: 'Chi tiết sản phẩm',
		nameProduct: name
	});
};
exports.detail_receipt = function (req, res) {
	res.render('customer-views/detail-receipt', { title: 'Chi tiết hóa đơn' });
};
exports.history = function (req, res) {
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
		req.session.cartShop = [...req.session.cartShop.filter((item) => item._id !== id)];
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

getSumComment = async (idProduct) => {
	return await Comment.find({ idProduct }).countDocuments();
};

getSumSearchProduct = async (search) => {
	// return await Product.find({ $text: { $search: key } }).countDocuments();

	// await Product.find({}, (err, result) => {
	// 	if (err) {
	// 		return 0;
	// 	} else {
	// 		const count = 0;
	// 		result.forEach((item) => item.name.includes(key) && count++);
	// 		console.log('count: ', count);
	// 		return count;
	// 	}
	// });

	// const search = '/.*' + key + '.*/';
	// const key = `/^` + search + `$/i`;
	const key = new RegExp('^' + search.toLowerCase(), 'i');
	return await Product.find({ name: key }).countDocuments();
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

exports.post_comment = async (req, res) => {
	const idProduct = req.query.idProduct;
	const content = req.query.content;
	console.log(idProduct + ' - and ' + content);
	if (!req.user) {
		res.send({ isSuccess: false });
	} else {
		const comment = new Comment({
			idProduct,
			idUser: req.user._id,
			content
		});
		const result = comment.save();
		//get comment
		const newComment = await Comment.findOne({ idProduct, idUser: req.user._id })
			.populate('idUser')
			.exec((err, result) => {
				if (result) {
					console.log('new comment product: ', result);
					res.send({ isSuccess: true, newComment: result });
				} else {
					console.log('new comment failed');
					res.send({ isSuccess: true });
				}
			});
	}
};

exports.pagingShop = async (req, res) => {
	const typeId = req.query.type || '';
	const page = req.query.page || 1;
	console.log('type: ', typeId, '- page:', page);
	let db;
	if (typeId !== '') {
		db = Product.find({ type: typeId })
			.limit(Constants.LIMIT_PRODUCT_PER_PAGE)
			.skip((page - 1) * Constants.LIMIT_PRODUCT_PER_PAGE)
			.sort({ name: 1 });
	} else {
		db = await Product.find({})
			.limit(Constants.LIMIT_PRODUCT_PER_PAGE)
			.skip((page - 1) * Constants.LIMIT_PRODUCT_PER_PAGE)
			.sort({ name: 1 });
	}
	if (db) {
		res.send({
			products: db,
			currentPage: page
		});
	}
};

exports.search = async (req, res) => {
	typeProduct = await Type.find({}, (err, type) => {
		if (err) {
			return next(err);
		} else {
			return type;
		}
	});
	//get origin table
	const origin = await Origin.find({});
	//get producer table
	const producer = await Producer.find({});

	const search = req.body.search || '';
	console.log('search: ', search);
	const sum = await getSumSearchProduct(search);
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
	let paging = getPaging(sumPage, page, '/search?search=' + search + '&');

	const key = new RegExp('^' + search.toLowerCase(), 'i');
	await Product.find({ name: key }, (err, db) => {
		console.log('sum: ', sum, 'db: ', db);
		title = `Kết quả tìm kiếm cho '${search}'`;
		console.log('title: ', title);
		if (db) {
			res.render('customer-views/shop', {
				title,
				link: '',
				products: db,
				standOutProducts: db.filter((item, index) => item.isStandOut == true),
				typeProduct,
				paging,
				currentPage: page,
				origin,
				producer,
				sum
			});
		}
	});
};
getSumSearchAdvanced = async (type, discount, origin, producer) => {
	return await Product.find({
		type,
		discount: { $gte: discount },
		origin,
		producer,
		isDeleted: 'false'
	}).countDocuments();
};

exports.searchAdvanced = async (req, res) => {
	const typeSearch = req.body.type || req.query.type || { $ne: null };
	const discountSearch = req.body.discount || req.query.discount || 0;
	const originSearch = req.body.origin || req.query.origin || { $ne: null };
	const producerSearch = req.body.producer || req.query.producer || { $ne: null };

	console.log(
		'search: ',
		typeSearch,
		discountSearch,
		'origin: ',
		originSearch,
		'producer:',
		producerSearch,
		'discount: ',
		discountSearch
	);
	//get type
	const typeProduct = await Type.find({}, (err, type) => {
		if (err) {
			return next(err);
		} else {
			return type;
		}
	});
	//get origin table
	const origin = await Origin.find({});
	//get producer table
	const producer = await Producer.find({});

	var title = 'Kết quả tìm kiếm';
	const sum = await getSumSearchAdvanced(typeSearch, discountSearch, originSearch, producerSearch);
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

	paging = getPaging(sumPage, page, '/searchAdvanced?');
	db = await Product.find({
		type: typeSearch,
		discount: { $gte: discountSearch },
		origin: originSearch,
		producer: producerSearch,
		isDeleted: 'false'
	})
		.limit(Constants.LIMIT_PRODUCT_PER_PAGE)
		.skip((page - 1) * Constants.LIMIT_PRODUCT_PER_PAGE)
		.sort({ name: 1 });

	console.log('discount search: ', discountSearch);
	if (db) {
		res.render('customer-views/searchResult', {
			title,
			link: '',
			products: db,
			standOutProducts: db.filter((item, index) => item.isStandOut == true),
			typeProduct: typeProduct,
			paging,
			currentPage: page,
			sum,
			origin,
			producer,
			typeSearch: req.body.type || req.query.type || '',
			originSearch: req.body.origin || req.query.origin || '',
			producerSearch: req.body.producer || req.query.producer || '',
			discountSearch: req.body.discount || req.query.discount
		});
	}
};
