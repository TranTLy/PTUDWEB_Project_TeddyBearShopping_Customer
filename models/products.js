// const ObjectId = require("mongodb").ObjectId;
// const { db } = require("../dbs");
// const PRODUCTS_COLLECTION = "products";

// const productDetail = async id => {
//   const results = await db
//     .collection(PRODUCTS_COLLECTION)
//     .find({ _id: ObjectId(id) })
//     .toArray();
//   return results[0];
// };

// const products = async () => {
//   console.log("test db: ", db);
//   const results = await db.collection(PRODUCTS_COLLECTION).toArray();

//   console.log("results: " + JSON.stringify(results));
//   return results;
// };

// exports.productDetail = productDetail;
// exports.products = products;

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
let productsDb;

client.connect(err => {
  const collection = client.db("ToyShopDB").collection("products");
  // perform actions on the collection object
  // console.log("collection: " + collection);

  collection.find({}).toArray((error, products) => {
    productsDb = products;
    console.log("product in db: ", productsDb);
  });
  client.close();
});

exports.productsDb = productsDb;
