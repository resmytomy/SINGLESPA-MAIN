var fs = require('fs');
var path = require('path');
var async = require("async");

function getDirr(parentDir){  
return new Promise((resolve, reject) => {  
  var parent={
    "showChildren":false,
    "name":parentDir,
    "children":[]
  
  }  
fs.readdir(parentDir,  (err, files)=> {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  async.each(files,(file,cb)=>{
   var fromPath = path.join(parentDir, file);
    fs.stat(fromPath, function (error, stat) {
      if (error) {
        console.error("Error stating file.", error);
        return;
      }
      if (stat.isFile()){

        var children={
          "name":file,
          "showChildren":false,
         " children":[]
      
      }
       parent.children.push(children);
           cb();
      }
      else  {        
          getDirr(fromPath).then(child=>{
            parent.children.push(child);
            cb();
          }
              )
      }
  
    });
  } , ()=>{
    resolve(parent);
  
  }
  )
  }
 
);
});}



getDirr("A")
.then(out=>console.log(JSON.stringify(out)))