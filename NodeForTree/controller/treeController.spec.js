jest.mock('fs');
const fs = require("fs");
const folderDetailsObj = require('../service/FolderDetails')
const treeController = require('./treeController.js');
const controller = new treeController();
describe("Testing the controller for file manipulation", () => {

    it("should get the tree structure", async () => {
        const mockResponse = {
            showChildren: false,      name: 'A', type: 'folder', children: [   {    name: 'TextDoc.rtf',   showChildren: true,           type: 'file',
                    children: [] },  {  showChildren: false, name: 'B', type: 'folder', children: []   }   ]};
        let res = {
            json(data) {
                this.jsonRe = data;
                }
             };
        let req;
        folderDetailsObj.getDirr = jest.fn();
        folderDetailsObj.getDirr.mockReturnValue(Promise.resolve(mockResponse));
        await controller.getDetails(req, res);
        expect(res.jsonRe).toBe(mockResponse);
      });

    it("should get error if there is any error during tree structure retrival ", async () => {
        let res = {
            json(data) {
                this.jsonRe = data;
                }
             };
        let req;
        folderDetailsObj.getDirr = jest.fn();
        folderDetailsObj.getDirr.mockReturnValue(Promise.reject(new Error("Error occured")));
        await controller.getDetails(req, res);
        expect(res.jsonRe instanceof Error);

    });
})