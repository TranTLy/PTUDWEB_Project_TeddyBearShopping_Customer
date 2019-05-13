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
