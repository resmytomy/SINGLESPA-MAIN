const express = require('express');
const cors = require('cors')
const cpuDetailsController = require('./controller/cpuController.js');


const app = express();
const controller=new cpuDetailsController();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', controller.getDetails);
module.exports=app;