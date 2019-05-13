// // const MongoClient = require("mongodb").MongoClient;
// // const URI = "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/ToyShopDb";

// // var dbs = { production: {} };

// // function connect(url) {
// //   return MongoClient.connect(url).then(client => client.db());
// // }

// // exports.initdb = async function() {
// //   // let databases = await Promise.all([connect(PROD_URI), connect(MKTG_URI)])
// //   let database = await connect(URI);
// //   dbs.production = database;
// // };

// // exports.dbs = dbs;
// const MongoClient = require("mongodb").MongoClient;
// const uri = "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// let db = {};
// client.connect(err => {
//   db = client.db("ToyShopDB");
//   //   console.log("test db", db.collection("products"));
//   // perform actions on the collection object
//   client.close();
// });

// exports.db = db;

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb+srv://admin:admin123@cluster0-yxmrz.mongodb.net/test";

// Database Name
const dbName = "ToyShopDB";
let db;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);

  client.close();
});

exports.db = db;
