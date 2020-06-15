
const cpuDetailsObject = require('../service/cpudetails');
const cpuDetailsController = require('./cpuController')
const controller = new cpuDetailsController();

describe("Testing the controller for cpu and battery details ", () => {

    it("Testing the controller for cpu and battery details", async () => {
        cpuDetailsObject.getCpuDetails = jest.fn();
        cpuDetailsObject.getBatteryDetails = jest.fn();
        const retrnVal = {
            "manufacturer": "Intel®",
            "brand": "Core™ i7-8665U", "vendor": "GenuineIntel", "family": "6", "model": "142",
            "stepping": "12", "revision": "", "voltage": "", "speed": "1.90", "speedmin": "",
            "speedmax": "2.11", "governor": "", "cores": 8, "physicalCores": 4, "processors": 1, "socket": "BGA1528"
        };
        const batteryVl = { "hasbattery": true, "cyclecount": 0, "ischarging": true, "designedcapacity": 0, "maxcapacity": 0, "currentcapacity": 0, "voltage": 13.15, "capacityUnit": "mWh", "percent": 98, "timeremaining": -1, "acconnected": true, "type": "", "model": "", "manufacturer": "", "serial": "", "designcapacity": 0 };
        const result = { "cpu": retrnVal, "battery": batteryVl };
        cpuDetailsObject.getCpuDetails.mockReturnValue(Promise.resolve(retrnVal))
        cpuDetailsObject.getBatteryDetails.mockReturnValue(Promise.resolve(batteryVl))

        let req;
        // let jsonRe;
        let res = {
            json(data) {
                this.jsonRe = data;
                expect(res.jsonRe).toStrictEqual(result)
            }
        };
        await controller.getDetails(req, res);


    });

    it("shpould return error if there is any from  cpu and battery details", async () => {
        cpuDetailsObject.getCpuDetails = jest.fn();
        cpuDetailsObject.getBatteryDetails = jest.fn();

        cpuDetailsObject.getCpuDetails.mockReturnValue(Promise.reject(new Error("Error occured")))
        cpuDetailsObject.getBatteryDetails.mockReturnValue(Promise.reject(new Error("Error occured")))

        let req;
        let res = {
            json(data) {
                expect(data instanceof Error)

           }
        };
        await controller.getDetails(req, res);


    });




})