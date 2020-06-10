
jest.mock("child_process");
child_process = require('child_process')
const exec = require("child_process").exec;
const CommandProcessingService = require('./terminalService');
const util = new CommandProcessingService();
describe("Testing the API for commandline", () => {

    it("should return the reulut   ", done => {

        let req = {body :{
            'data': ['nn --version']
        
         }}
        child_process.exec.mockImplementation((cmd,cb) => cb(null, "9.0.1",null))
        util.getResult(req).then(res => expect(res).toContain("9"))
            .catch(err => expect(err.message).toBe("Error occured"));
        done();


    });

    it("should return the error if there any   ", done => {

        let req = {body :{
            'data': ['nn --version']
        
         }}
        child_process.exec.mockImplementation((cmd,cb) => cb(new Error("Error occured"), null,null))
        util.getResult(req).then()
            .catch(err => expect(err.message).toBe("Error occured"));
        done();


    });


});
