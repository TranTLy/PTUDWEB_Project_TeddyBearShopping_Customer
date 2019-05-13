const ObjectId = require("mongodb").ObjectId;
const { db } = require("../dbs");

const PRODUCTS_COLLECTION = "products";

const productDetail = async id => {
  const results = await db
    .collection(PRODUCTS_COLLECTION)
    .find({ _id: ObjectId(id) })
    .toArray();
  return results[0];
};

const products = async () => {
  const results = await db.collection(PRODUCTS_COLLECTION).toArray();

  console.log("results: " + JSON.stringify(results));
  return results;
};

exports.productDetail = productDetail;
exports.products = products;
