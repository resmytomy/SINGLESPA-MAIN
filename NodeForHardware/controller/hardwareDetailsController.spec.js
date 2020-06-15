
const hardwareDetailsObject = require('../service/hardwareDetails');
const hardwareDetailsController = require('./hardwareDetailsController');
const { baseboard } = require('systeminformation');
const controller = new hardwareDetailsController();

describe("Testing the controller for hardware details ", () => {

    it("Testing the controller hardware details", async () => {
        hardwareDetailsObject.getSystemDetails = jest.fn();
        hardwareDetailsObject.getBiosDetails = jest.fn();
        hardwareDetailsObject.getBaseboardDetails = jest.fn();
        hardwareDetailsObject.getChassisDetails = jest.fn();
        const systemInfo= {"manufacturer":"Dell Inc.","model":"Latitude 7300","version":"","serial":"6ZMB8Y2","uuid":"4C4C4544-005A-4D10-8042-B6C04F385932","sku":"08E0"};
        const bios={"vendor":"Dell Inc.","version":"DELL   - 1072009","releaseDate":"2019-04-30","revision":""};
        const baseBoard={"manufacturer":"Dell Inc.","model":"0PYRY5","version":"A00","serial":"/6ZMB8Y2/CNCMK009870239/","assetTag":""};
        const chassis={"manufacturer":"Dell Inc.","model":"","type":"Notebook","version":"","serial":"6ZMB8Y2","assetTag":"","sku":""};
        const result = { "system": systemInfo, "bios": bios,"baseBoard":baseBoard,"chassis": chassis};
        hardwareDetailsObject.getSystemDetails.mockReturnValue(Promise.resolve(systemInfo))
        hardwareDetailsObject.getBiosDetails.mockReturnValue(Promise.resolve(bios))
        hardwareDetailsObject.getBaseboardDetails.mockReturnValue(Promise.resolve(baseBoard))
        hardwareDetailsObject.getChassisDetails.mockReturnValue(Promise.resolve(chassis))

        let req;
        let res = {
            json(data) {
                this.jsonRe = data;
                expect(res.jsonRe).toStrictEqual(result)
            }
        };
        await controller.getDetails(req, res);


    });

    it("shpould return error if there is any from  cpu and battery details", async () => {
        hardwareDetailsObject.getSystemDetails = jest.fn();
        hardwareDetailsObject.getBiosDetails = jest.fn();
        hardwareDetailsObject.getBaseboardDetails = jest.fn();
        hardwareDetailsObject.getChassisDetails = jest.fn();
        hardwareDetailsObject.getSystemDetails.mockReturnValue(Promise.reject(new Error("Error occured")))
        hardwareDetailsObject.getBiosDetails.mockReturnValue(Promise.reject(new Error("Error occured")))
        hardwareDetailsObject.getBaseboardDetails.mockReturnValue(Promise.reject(new Error("Error occured")))
        hardwareDetailsObject.getChassisDetails.mockReturnValue(Promise.reject(new Error("Error occured")))

        let req;
        let res = {
            json(data) {
                expect(data instanceof Error)

           }
        };
        await controller.getDetails(req, res);


    });




})