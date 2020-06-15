jest.mock('fs');
const fs = require("fs");
const fileUtilObject = require('../service/fileutil');
const fileController = require('./file-editorController.js');
const controller = new fileController();
describe("Testing the controller for file manipulation", () => {

  it("should get the .npmrc content on clalling readfilecontroller", async () => {
    fileUtilObject.getFile = jest.fn();
    fileUtilObject.getFile.mockReturnValue(Promise.resolve("appdata={npm}"))
    let req;
    let jsonRe;

    let res = {
      json(data) {
        this.jsonRe = data;
      }
    };
    await controller.readFileController(req, res);
    fs.readFile.mockClear();
    expect(res.jsonRe).toContain("appdata");



  });


  it("should retturn error if any  clalling readfilecontroller", async () => {
    fileUtilObject.getFile = jest.fn();
    fileUtilObject.getFile.mockReturnValue(Promise.reject(new Error("Error occured")))
    let req;
    let jsonRe;

    let res = {
      json(data) {
   
        this.jsonRe=data;
   
       
      }
    };
    await controller.readFileController(req, res);
    fs.readFile.mockClear();
    expect(res.jsonRe instanceof Error);



  });


  it("should write the .npmrc content on clalling readfilecontroller", async () => {
    fileUtilObject.write = jest.fn();
    fileUtilObject.write.mockReturnValue(Promise.resolve("appdata={npm}"))

    let req = {
      body: {
        data: [{
          index: 0,
          name: "New",
          value: "${nn}"
        },
        {
          index: 1,
          name: "Old",
          value: "${OO}"
        }
        ]
      }
    }
    let jsonRe;

    let res = {
      json(data) {
        this.jsonRe = data;
      }
    };
    await controller.writeFileController(req, res);
    fs.writeFile.mockClear();
    expect(res.jsonRe).toContain("appdata");

  });
  it("should return error  on clalling readfile cotroller if ther is nay ", async () => {
    fileUtilObject.write = jest.fn();
    fileUtilObject.write.mockReturnValue(Promise.reject(new Error("Error occured")))

    let req = {
      body: {
        data: [{
          index: 0,
          name: "New",
          value: "${nn}"
        },
        {
          index: 1,
          name: "Old",
          value: "${OO}"
        }
        ]
      }
    }
    let jsonRe;

    let res = {
      json(data) {
        this.jsonRe = data;
      }
    };
    await controller.writeFileController(req, res);
    fs.writeFile.mockClear();
    expect(res.jsonRe instanceof Error);

  });


})