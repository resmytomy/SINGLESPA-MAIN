const express = require('express');
const cors = require('cors')
const treeController = require('./controller/treeController.js');


const app = express();
const controller=new treeController();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', controller.getDetails);
 
 var server = app.listen(8885, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})   