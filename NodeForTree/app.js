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
 
  
module.exports=app;