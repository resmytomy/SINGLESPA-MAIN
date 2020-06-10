
jest.mock("child_process");
child_process = require('child_process')
const exec = require("child_process").exec;
const newObject = require('../service/terminalService');
const TerminalController = require('./terminal-controller');
const controller = new TerminalController();

describe("Testing the controller for commandline ", () => {

  it("should get theresult of the command ", async () => {
    newObject.getResult = jest.fn();
    newObject.getResult.mockReturnValue(Promise.resolve("9.0.1"))
    let req = {
      body: {
        'data': ['npm --version']

      }
    }
    let jsonRe;
    let res = {
      json(data) {
        console.log('dataaaaa..', data)
        this.jsonRe = data;
      }
    };
    await controller.executeCommandCotroller(req, res);
    console.log(res.jsonRe)

    expect(res.jsonRe).toContain("9");

  });


  it("should return error  if there is any during execution the command ", async () => {
    let req = {
      body: {
        'data': ['npm --version']

      }
    }
    newObject.getResult = jest.fn();
    newObject.getResult.mockReturnValue(Promise.reject(new Error("Error occured")))


    let jsonRe;

    let res = {
      json(data) {
        console.log('dataaaaa..', data)
        this.jsonRe = data;
      }
    };
    await controller.executeCommandCotroller(req, res);
    console.log(res.jsonRe);
    expect(res.jsonRe instanceof Error);


  });



})