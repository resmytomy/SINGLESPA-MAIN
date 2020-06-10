const exec = require("child_process").exec;

class CommandProcessingService {
  
   constructor() {
  }   
  getResult(req) {
    console.log('inside sevice')
    var cmd = req.body.data
    return new Promise( (resolve, reject)=> {
      var ch = exec(cmd,  (error, stdout, stderr) =>{
        if (error) {
          reject(error.stderr);
        } else {
          resolve(stdout);
        }
      });
    })
  }

}
newObject=new CommandProcessingService();

module.exports = newObject;