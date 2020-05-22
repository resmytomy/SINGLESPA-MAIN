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

const TerminalController = require('./controller/terminal-controller');
const controller=new TerminalController();

app.post('/executeCommand', controller.executeCommandCotroller);

var server = app.listen(8080, function () {

  var host = server.address().address

  var port = server.address().port

})

