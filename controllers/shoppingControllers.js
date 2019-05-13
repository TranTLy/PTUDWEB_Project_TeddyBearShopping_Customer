const { db } = require("../dbs/index");
const { productsDb } = require("../models/products");

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
exports.product_other = async function(req, res) {
  const productDb = [
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Bé màu",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/o1.jfif", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    },
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Ngựa tím",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/o2.jfif", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    },
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Khủng long",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/o3.jpg", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    },
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: false,
      name: "Xe cẩu",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/o4.jfif", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    },
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: false,
      name: "Cá vui vẻ",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/o5.png", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    },
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: false,
      name: "Thú xanh",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/o6.jfif", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    },
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Vòng xếp",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/o7.jfif", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    },
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Bolling thú",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nhiều màu",
      imgs: ["images/p2.jpg", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    },
    {
      id: 4,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Cao bồi",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/o9.jpg", "images/p2.jpg"],
      decription:
        "Được làm từ chất liệu cao cấp, an toàn cho sức khỏe của trẻ nhỏ"
    }
  ];

  const MongoClient = require("mongodb").MongoClient;
  const assert = require("assert");

  // Connection URL
  const url = "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test";

  // Database Name
  const dbName = "ToyShopDB";

  // Use connect method to connect to the server
  await MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    const findDocuments = function(db, callback) {
      // Get the documents collection
      const collection = db.collection("products");
      // Find some documents
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
        let myProducts = docs;
        res.render("customer-views/product", {
          title: "Đồ chơi khác",
          link: "product-other",
          products: myProducts,
          standOutProducts: myProducts.filter(
            (item, index) => item.isStandOut == true
          )
        });
      });
    };
  });

  // let myProducts;
  // const findDocuments = await function(db, callback) {
  //   // Get the documents collection
  //   const collection = db.collection("products");
  //   // Find some documents
  //   collection.find({}).toArray(function(err, docs) {
  //     assert.equal(err, null);
  //     console.log("my product: " + myProducts);
  //     myProducts = docs;
  //     res.render("customer-views/product", {
  //       title: "Đồ chơi khác",
  //       link: "product-other",
  //       products: productDb,
  //       standOutProducts: productDb.filter(
  //         (item, index) => item.isStandOut == true
  //       )
  //     });
  //   });
  // };

  // res.render("customer-views/product", {
  //   title: "Đồ chơi khác",
  //   link: "product-other",
  //   products: myProducts,
  //   standOutProducts: myProducts.filter((item, index) => item.isStandOut == true)
  // });
};
exports.product_barbie = function(req, res) {
  const productBarbie = [
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Barbie cầu vồng",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb1.jpg", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Barbie thể thao",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb2.jpg", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Búp bê Barbie thời trang",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb3.jpg", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Đầu bếp Barbie ",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb4.jfif", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Barbie tóc dài",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb5.jfif", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Búp bê Barbie điệu đà",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb6.jpeg", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Nhạc sĩ Barbie",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb7.jpg", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Phi công Barbie",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb8.jpg", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Búp bê Barbie",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb9.jpg", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    }
  ];

  res.render("customer-views/product", {
    title: "Búp bê barbie",
    link: "product-barbie",
    products: productBarbie,
    standOutProducts: productBarbie.filter(
      (item, index) => item.isStandOut == true
    )
  });
};
exports.product_car = function(req, res) {
  const productCar = [
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi cao cấp",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c1.jpg"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    },
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi mũi khoan",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c2.jpg"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    },
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c3.jpg"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    },
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi xanh",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c4.jpg"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    },
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi hồng",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c5.jfif"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    },
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi nhện",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c6.jfif"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    },
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi đẳng cấp",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c7.jfif"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    },
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: false,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi cảnh sát",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c8.jfif"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    },
    {
      id: 1,
      type: 3,
      discount: 0,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Xe hơi biến hình",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/c9.jpg"],
      decription:
        "Xe được làm bằng nhựa cao cấp, tốt cho trẻ nhỏ. Mẫu mã đa dạng, mới, đẹp."
    }
  ];
  // res.render("customer-views/product", { title: "Sản phẩm", products: productBarbie });
  res.render("customer-views/product", {
    title: "Xe đồ chơi",
    link: "product-car",
    products: productCar,
    standOutProducts: productCar.filter(
      (item, index) => item.isStandOut == true
    )
  });
};
exports.product_bear = function(req, res) {
  const productBear = [
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu Teddy",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a1.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu dễ thương",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a2.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu nhỏ",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a3.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu xù",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a4.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu Teddy",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a5.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    }
  ];

  // res.render("customer-views/product", { title: "Sản phẩm", products: productBarbie });
  res.render("customer-views/product", {
    title: "Gấu bông",
    link: "product-bear",
    products: productBear,
    standOutProducts: productBear.filter(
      (item, index) => item.isStandOut == true
    )
  });
};
exports.shop = function(req, res) {
  const productsSDb = [
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Búp bê Barbie",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/productExample/bb4.jfif", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 5,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: false,
      name: "Bolling Thú",
      price: 220000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nhiều màu",
      imgs: ["images/p2.jpg", "images/p4.jpg"],
      decription: "Nhựa cứng cao cấp"
    },
    {
      id: 1,
      type: 3,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Vị dễ thương",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/p4.jpg", "images/f3.jpg"],
      decription: "Chất liệu nhựa cao cấp, an toàn cho sức khỏe của bé"
    },
    {
      id: 1,
      type: 4,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: false,
      name: "Xe đồ chơi",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/p3.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu Teddy",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a1.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu dễ thương",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a2.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu nhỏ",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a3.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu xù",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a4.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu Teddy",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a5.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    }
  ];

  const standOutProductsDb = [
    {
      id: 1,
      type: 2,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Búp bê Barbie",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/p1.jpg", "images/p2.jpg"],
      decription: "Búp bê mẫu mã mới nhất, được nhiều bạn nhỏ yêu thích"
    },
    {
      id: 1,
      type: 5,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: false,
      name: "Bolling Thú",
      price: 220000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nhiều màu",
      imgs: ["images/p2.jpg", "images/p4.jpg"],
      decription: "Nhựa cứng cao cấp"
    },
    {
      id: 1,
      type: 3,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Vị dễ thương",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/p4.jpg", "images/f3.jpg"],
      decription: "Chất liệu nhựa cao cấp, an toàn cho sức khỏe của bé"
    },
    {
      id: 1,
      type: 4,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: false,
      name: "Xe đồ chơi",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/p3.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu Teddy",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a1.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu dễ thương",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a2.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    },
    {
      id: 1,
      type: 1,
      discount: 0.2,
      isStandOut: true,
      isDeleted: false,
      isNew: true,
      name: "Gấu nhỏ",
      price: 234000,
      currentPrice: 210000,
      rating: 3,
      numberValidProduct: 12,
      color: "Nâu",
      imgs: ["images/a3.jpg", "images/f3.jpg"],
      decription: "Loại gấu bông mềm, bông gòn cao cấp"
    }
  ];
  res.render("customer-views/shop", {
    title: "Cửa hàng",
    products: productsSDb,
    standOutProducts: standOutProductsDb
  });
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
