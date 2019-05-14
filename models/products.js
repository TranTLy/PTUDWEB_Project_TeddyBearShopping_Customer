const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
let productsDb;

const getProducts = async function() {
  const connect = await client.connect();

  //await client.connect(err => {
  const collection = client.db("ToyShopDB").collection("products");

  return await collection.find({}).toArray();
  //return collection.find({}).toArray((error, products) => {
  //  console.log("product in db: ", products);
  //  return products;
  //});
  // client.close();
  //});

  // console.log("product in db: ", productsDb);
  // return productsDb;
};

exports.getProducts = getProducts;
exports.productsDb = productsDb;
