const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const DATABASE = "ToyShopDB";
const COLLECTION_PRODUCTS = "products";
const BEAR_TYPE = 1;
const BARBIE_TYPE = 2;
const CAR_TYPE = 3;
const OTHER_TYPE = 4;

const getProducts = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);

  return await collection.find({}).toArray();
};

const getBearProduct = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);

  return await collection.find({ type: BEAR_TYPE }).toArray();
};

const getBarbiePoduct = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);

  return await collection.find({ type: BARBIE_TYPE }).toArray();
};
const getCarProduct = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);

  return await collection.find({ type: CAR_TYPE }).toArray();
};
const getOtherProduct = async function() {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);

  return await collection.find({ type: OTHER_TYPE }).toArray();
};

const getSingleProduct = async function(id) {
  const connect = await client.connect();
  const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const getStandOutProduct = async function(id) {
	const connect = await client.connect();
	const collection = client.db(DATABASE).collection(COLLECTION_PRODUCTS);
	return await collection.find({ isStandOut: true }).toArray();
};

exports.getProducts = getProducts;
exports.getBearProduct = getBearProduct;
exports.getBarbiePoduct = getBarbiePoduct;
exports.getCarProduct = getCarProduct;
exports.getOtherProduct = getOtherProduct;
exports.getSingleProduct = getSingleProduct;
exports.getStandOutProduct = getStandOutProduct;