// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");

// // Connection URL
// const url = "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test";

// // Database Name
// const dbName = "ToyShopDB";
// let db;
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   db = client.db(dbName);
//   // console.log("db: ", db);
//   client.close();
// });
// exports.db = db;

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("ToyShopDB").collection("products");

//   collection.find({}).toArray((error, products) => {
//     console.log("product in db: ", productsDb);
//     return (productsDb = products);
//   });
//   client.close();
// });
var dbs = {};
exports.initdb = async function() {
  // client.connect();
  // const databse = await client.db("ToyShopDB");
  // console.log("database: ", databse);
  // await db = databse;
  // // client.close();

  await client.connect(err => {
    const database = client.db("ToyShopDB");
    dbs = database;
    client.close();
  });
};
exports.dbs = dbs;
