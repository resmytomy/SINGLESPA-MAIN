const cpuDetailsObject=require('../service/cpudetails')

class cpuDetailsController{ 
    constructor(){
    }
 
getDetails= (req, res) => {
    const cpu= cpuDetailsObject.getCpuDetails()
    const batt=cpuDetailsObject.getBatteryDetails();
    Promise.all(
     [cpu.catch(error => { return error; }),
      batt.catch(error => { return error; })])
    .then(values=>{
        const harwdareDetails={
            'cpu':values[0],
            'battery':values[1]
        }
        res.json(harwdareDetails);
    })
    .catch(err=>res.json(err))


}

}
module.exports=cpuDetailsController;