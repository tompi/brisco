var mongodb = require('mongodb');

var Db = mongodb.Db;

var db = new Db('tompitest');
db.open(function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});