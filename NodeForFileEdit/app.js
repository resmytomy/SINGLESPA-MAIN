const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

const fileController = require('./controller/file-editorController.js');
const controller=new fileController();

app.get('/', controller.readFileController);

app.post('/edit', controller.writeFileController);

var server = app.listen(8098, function () {

  var host = server.address().address

  var port = server.address().port



  console.log("Example app listening at http://%s:%s", host, port)

})

