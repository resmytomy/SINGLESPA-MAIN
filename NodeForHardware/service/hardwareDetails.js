const si = require("systeminformation");

class hardWareDetails{
  constructor(){}


getSystemDetails () {
  return new Promise((resolve, reject) => {

    si.system((err,data)=>{
      if (err){
        reject(err)
        return;
      }
      resolve(data)
         

    })
  })

}
getBiosDetails(){
  return new Promise((resolve, reject) => {
    si.bios((err,data)=>{
      if (err){
        reject(err)
      }
   
      resolve(data)   })
  })

}
getBaseboardDetails(){
  return new Promise((resolve, reject) => {
    si.baseboard((err,data)=>{
      if (err){
        reject(err)
      }
   
      resolve(data)   })
  })

}
getChassisDetails(){
  return new Promise((resolve, reject) => {
    si.chassis((err,data)=>{
      if (err){
        reject(err)
      }
   
      resolve(data)   })
  })

}


}
hardwareDetailsObject=new hardWareDetails()
module.exports=hardwareDetailsObject;

