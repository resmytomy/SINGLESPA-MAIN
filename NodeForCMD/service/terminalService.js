const util = require('util');

const exec = util.promisify(require('child_process').exec);
class CommandProcessingService{
    constructor(){}
 async  executeCommand(req,res) {
  var cmd=req.body.data

   console.log('inside serv');
   console.log(cmd);
   try{
     const { stdout, stderr } = await exec(cmd);
     console.log("stderr")
     console.log(stderr)
  if(stdout){
    console.log(stdout);
    res.json(stdout);
  }else if(stderr.length!=0){
    console.log('stderr');

    res.json(stderr); 
  }
}catch(err){
  console.log(err.stderr);
  res.json(err.stderr);
}
 }
}
module.exports=CommandProcessingService;