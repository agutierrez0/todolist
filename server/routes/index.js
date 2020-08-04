var express = require('express');
var router = express.Router();


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var list = []

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("list");
  dbo.collection("listItem").find({}).toArray(function (err, result) {
    if (err) throw err;
    list = result;
    db.close();
  });
});

/* GET home page. */
router.get('/list', function (req, res, next) {
  console.log("hello")
  var formatList = []
  list.forEach(element => formatList.push(element.itemName))
  res.send(formatList)
});

router.post('/list', function (req, res, next) {
  var item = { 'itemName': req.body.item }
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("list");
    dbo.collection("listItem").insertOne(item, function (err, res) {
      if (err) throw err;
      console.log("item added")
      db.close()
    });
  });

  list.push(item)
  res.sendStatus(200)
});

module.exports = router;
