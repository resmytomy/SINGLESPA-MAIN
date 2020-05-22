var fs = require('fs');
var async = require('async');

var path = 'D'
var Logs = [];
var products=['a','b','c'];

async.each(products.slice(0, 3), function (product, callback) {

    fs.appendFile('ParseLog.txt', "PRODUCT name: " + product, function (err,data) {
      console.log("iterate");
      callback(err); // make sure to pass `err`!
    });
  }, 
  function(err) {
    if (err) console.log('ERROR', err);
    console.log("ALL FINISH");
  });