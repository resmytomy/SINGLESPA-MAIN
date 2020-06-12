var fs = require('fs');
var path = require('path');
var async = require("async");

class FolderDetails {
  constructor() { }
  
  getDirr(parentDir) {
    return new Promise((resolve, reject) => {

      var parent = {
        "showChildren": false,
        "name": parentDir.split(/[\\]+/).pop(),
        "type": "folder",
        "children": []

      }
      fs.readdir(parentDir, (err, files) => {
        if (err) {
          reject(err);
        }
        async.each(files, (file, cb) => {
          var fromPath = path.join(parentDir, file);
          fs.stat(fromPath, (error, stat) => {

            if (error) {
             reject(error);
             return;
            }
            if (stat.isFile()) {
              var children = {
                "name": file,
                "showChildren": true,
                "type": "file",
                "children": []

              }
              parent.children.push(children);
              cb();
            }
            else {
              this.getDirr(fromPath).then(child => {
                parent.children.push(child);
                cb();
              }
              )
            }

          });
          
        }, () => {
          resolve(parent);

        }
        )
      }

      );
    });
  }


}

folderDetailsObj=new FolderDetails();
module.exports = folderDetailsObj;

