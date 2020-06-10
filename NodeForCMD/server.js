const app = require("./app");

var server = app.listen(8095, function () {

  var host = server.address().address

  var port = server.address().port

})
module.exports = server;
