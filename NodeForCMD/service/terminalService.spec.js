
jest.mock("child_process");
child_process = require('child_process')
const exec = require("child_process").exec;
const newObject = require('./terminalService');
describe("Testing the API for commandline", () => {

    it("should return the reulut   ", done => {

        let req = {body :{
            'data': ['nn --version']
        
         }}
        child_process.exec.mockImplementation((cmd,cb) => cb(null, "9.0.1",null))
        newObject.getResult(req).then(res => expect(res).toContain("9"))
            .catch(err => expect(err.message).toBe("Error occured"));
        done();


    });

    it("should return the error if there any   ", done => {
        let req = {body :{
            'data': ['nn --version']
        
         }}
        child_process.exec.mockImplementation((cmd,cb) => cb(new Error("Error occured"), null,null))
        newObject.getResult(req).then(res => expect(res).toContain("9"))
        .catch(err => expect(err.message).toBe("Error occured"));
    done();

    });


});
