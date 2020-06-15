const si = require("systeminformation");

class CpuDetails{
  constructor(){}


getCpuDetails () {

  return new Promise((resolve, reject) => {
      si.cpu((err,data)=>{
        if (err){
          reject(err)
        }
     
        resolve(data)   })
    })
  

}
getBatteryDetails(){
  return new Promise((resolve, reject) => {
    si.battery((err,data)=>{
      if (err){
        reject(err)
      }
   
      resolve(data)   })
  })

}



}
cpuDetailsObject=new CpuDetails();

module.exports=cpuDetailsObject;

