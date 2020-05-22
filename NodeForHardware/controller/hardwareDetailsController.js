const hardWareDetails=require('../service/hardwareDetails')

class hardwareDetailsController{ 
    constructor(){
        this. hardwareDet=new hardWareDetails();
    }
 
getDetails= (req, res) => {
console.log("controller")
    const system= this.hardwareDet.getSystemDetails();
    const bios=this.hardwareDet.getBiosDetails();
    const baseBoard=this.hardwareDet.getBaseboardDetails();
    const chassis=this.hardwareDet.getChassisDetails();
    Promise.all(
     [ system.catch(error => { return error; }),
        bios.catch(error => { return error; }),
        baseBoard.catch(error => { return error; }) ,
        chassis.catch(error => { return error; })     
     ])
    .then(values=>{
        const harwdareDetails={
            'system':values[0],
            'bios':values[1],
            'baseBoard':values[2],
            'chassis':values[3]
        }
        res.json(harwdareDetails);
    })
    .catch(err=>res.json(err))


}

}
module.exports=hardwareDetailsController;