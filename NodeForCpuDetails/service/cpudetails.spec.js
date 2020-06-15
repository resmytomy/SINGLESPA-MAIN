const cpuDetailsObject=require('./cpudetails');
const si = require("systeminformation");
jest.mock("systeminformation");

describe("Testing the API for commandline", () => {

    it("should return the Cpu details on getCpuDetails  ", done => {

       si.cpu.mockImplementation((cb) => cb(null,'123'))
 
       cpuDetailsObject.getCpuDetails().then((res)=>{
           expect(res).toBe('123')
           done();
        }).catch((res)=>{
            console.log('res',res);
            done();
         })


    });
    it("should return the Battery details on getBatteryDetails  ", done => {

        si.battery.mockImplementation((cb) => cb(null,'123'))
  
        cpuDetailsObject.getBatteryDetails().then((res)=>{
            expect(res).toBe('123')
            done();
         })
 
 
     });

     it("should return error if there is any from getBatteryDetails  ", done => {

        si.battery.mockImplementation((cb) => cb(new Error("Error occured"),null))
  
        cpuDetailsObject.getBatteryDetails().catch((err)=>{
            expect(expect(err.message).toBe("Error occured"));
            done(); 
 
     });
    });

   
    it("should return the Battery details on getBatteryDetails  ", done => {

        si.cpu.mockImplementation((cb) => cb(new Error("Error occured"),null))
  
        cpuDetailsObject.getCpuDetails().catch((err)=>{
            expect(expect(err.message).toBe("Error occured"));
            done(); 
 
     });
    });

});
