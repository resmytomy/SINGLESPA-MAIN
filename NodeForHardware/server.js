const app = require("./app");

var server = app.listen(8888, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})   
module.exports = server;
