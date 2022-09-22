const { MongoClient } = require("mongodb");
// localhost worked in node v16
//const Db = "mongodb://localhost:27017";
// 127.0.0.1 worked in node v17
const Db = "mongodb://127.0.0.1:27017";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.dir(client);
var dbConnection;
// alternative export option - methods as objects
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        dbConnection = db.db("myMoviesDb");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return dbConnection;
  },
  getObjectId: function () {
    var ObjectId = require("mongodb").ObjectId;
    return ObjectId;
  },
};
