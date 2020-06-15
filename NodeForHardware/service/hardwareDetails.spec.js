const hardwareDetailsObject=require('./hardwareDetails');
const si = require("systeminformation");
jest.mock("systeminformation");

describe("Testing the API for commandline", () => {
   const systemInfo= {"manufacturer":"Dell Inc.","model":"Latitude 7300","version":"","serial":"6ZMB8Y2","uuid":"4C4C4544-005A-4D10-8042-B6C04F385932","sku":"08E0"};
   
   
 const bios={"vendor":"Dell Inc.","version":"DELL   - 1072009","releaseDate":"2019-04-30","revision":""};
  const baseBoard={"manufacturer":"Dell Inc.","model":"0PYRY5","version":"A00","serial":"/6ZMB8Y2/CNCMK009870239/","assetTag":""};
  const chassis={"manufacturer":"Dell Inc.","model":"","type":"Notebook","version":"","serial":"6ZMB8Y2","assetTag":"","sku":""};

    it("should return the system details  on getSystemDetails  ", done => {

       si.system.mockImplementation((cb) => cb(null,systemInfo))
 
       hardwareDetailsObject.getSystemDetails().then((res)=>{
           expect(res).toBe(systemInfo)
           done();
        }).catch((res)=>{
            console.log('res',res);
            done();
         })


    });

    it("should return the error if there is any from  on system details  ", done => {

        si.system.mockImplementation((cb) => cb(new Error("Error occured"),null))
  
        hardwareDetailsObject.getSystemDetails().catch((err)=>{
            expect(expect(err.message).toBe("Error occured"));
            done(); 
 
     });
    });



    it("should return the Bios  details on getBiosDetails  ", done => {

        si.bios.mockImplementation((cb) => cb(null,bios))
  
        hardwareDetailsObject.getBiosDetails().then((res)=>{
            expect(res).toBe(bios)
            done();
         })
 
 
     });

     it("should return error if there is any from bios  ", done => {

        si.bios.mockImplementation((cb) =>cb(new Error("Error occured"),null))
  
        hardwareDetailsObject.getBiosDetails().catch((err)=>{
            expect(expect(err.message).toBe("Error occured"));
            done(); 
 
     });
    });
    it("should return the baseBoard  details on baseboard  ", done => {

        si.baseboard.mockImplementation((cb) => cb(null,baseBoard))
  
        hardwareDetailsObject.getBaseboardDetails().then((res)=>{
            expect(res).toBe(baseBoard)
            done();
         })
 
 
     });
   
    
    it("should return error if there is any from bios  ", done => {

        si.baseboard.mockImplementation((cb) =>cb(new Error("Error occured"),null))
  
        hardwareDetailsObject.getBaseboardDetails().catch((err)=>{
            expect(expect(err.message).toBe("Error occured"));
            done(); 
 
     });
    });

    it("should return the chassis  details on chassis  ", done => {

        si.chassis.mockImplementation((cb) => cb(null,chassis))
  
        hardwareDetailsObject.getChassisDetails().then((res)=>{
            expect(res).toBe(chassis)
            done();
         })
 
 
     });
    });
    
    it("should return error if there is any from chassis  ", done => {

        si.chassis.mockImplementation((cb) =>cb(new Error("Error occured"),null))
  
        hardwareDetailsObject.getChassisDetails().catch((err)=>{
            expect(expect(err.message).toBe("Error occured"));
            done(); 
 
     });
    });

   
   

