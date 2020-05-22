const CpuDetails=require('../service/cpudetails')

class cpuDetailsController{ 
    constructor(){
        this. cpuDet=new CpuDetails();
    }
 
getDetails= (req, res) => {

    const cpu= this.cpuDet.getCpuDetails()
    const batt=this.cpuDet.getBatteryDetails();
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