const hardwareDetailsObject=require('../service/hardwareDetails')

class hardwareDetailsController{ 
    constructor(){
    }
 
getDetails= (req, res) => {
console.log("controller")
    const system= hardwareDetailsObject.getSystemDetails();
    const bios=hardwareDetailsObject.getBiosDetails();
    const baseBoard=hardwareDetailsObject.getBaseboardDetails();
    const chassis=hardwareDetailsObject.getChassisDetails();
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