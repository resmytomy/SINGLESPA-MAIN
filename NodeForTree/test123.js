var fs = require('fs');
var path = require('path');
var async = require('async'); // https://github.com/caolan/async


getDirs("D/",callBack)

function getDirs(srcpath, cb) {
  fs.readdir(srcpath, function (err, files) {
    if(err) { 
      console.error(err);
      return cb([]);
    }
    var iterator = function (file, cb)  {
      fs.stat(path.join(srcpath, file), function (err, stats) {
        if(err) { 
          console.error(err);
          return cb(false);
        }
        if(stats.isDirectory()){
            console.log(file);
            getDirs(path.join(srcpath, file));

     
        }
        else{
            console.log(file)
        }
          })
    }
   // async.filter(files, iterator, cb);
  });
}
 function callBack(file,iterator){
console.log(file) }