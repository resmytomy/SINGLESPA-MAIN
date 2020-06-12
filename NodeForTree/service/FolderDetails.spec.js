const fs = require("fs");
jest.mock("fs");
const folderDetailsObj = require('./FolderDetails')

describe("Tree structure API", () => {

  it("it should check whether getFolderDetails is returning a promise with status true", done => {
    const mockList = [
      "B", "TextDoc.rtf"
    ];
    const mockResponse = {
      showChildren: false,
      name: 'A',
      type: 'folder',
      children: [
        {
          name: 'TextDoc.rtf',
          showChildren: true,
          type: 'file',
          children: []
        },
        {
          showChildren: false,
          name: 'B',
          type: 'folder',
          children: []
        }
      ]
    };

    const mockStatOnce = {
      isDirectory() {
        return true;
      },
      isFile() {
        return false;
      }
    };

    const mockStat = {
      isDirectory() {
        return false;
      },
      isFile() {
        return true;
      }
    };
    fs.readdir.mockImplementationOnce((file, cb) => cb(null, mockList));
    fs.readdir.mockImplementation((file, cb) => cb(null, []));
    fs.stat.mockImplementationOnce((file, cb) => cb(null, mockStatOnce));
    fs.stat.mockImplementation((file, cb) => cb(null, mockStat));
    folderDetailsObj.getDirr('A').then((response) => {
      expect(response).toEqual(mockResponse);
      done();
    })

   
  });
  it("it should check whether getFolderDetails is returning an error if there is nay error from fs.readdir", done => {
    const mockList = [
      "B", "TextDoc.rtf"
    ];

    const mockStatOnce = {
      isDirectory() {
        return true;
      },
      isFile() {
        return false;
      }
    };

    const mockStat = {
      isDirectory() {
        return false;
      },
      isFile() {
        return true;
      }
    };
    fs.readdir.mockImplementation((file, cb) => cb(new Error("Error occured"), null));
    fs.stat.mockImplementationOnce((file, cb) => cb(null, mockStatOnce));
    fs.stat.mockImplementation((file, cb) => cb(null, mockStat));
    folderDetailsObj.getDirr('A').catch(err => expect(err.message).toBe("Error occured"));
    fs.stat.mockReset();
    done();

  });

  it("it should check whether getFolderDetails is returning an error if there is nay error from fs.stat", done => {
    const mockList = [
      "B", "TextDoc.rtf"
    ];
    fs.stat.mockReset();

    fs.readdir.mockImplementation((file, cb) => cb(null, mockList));
    fs.stat.mockImplementation((file, cb) => cb(new Error("Error occured"), true));
    folderDetailsObj.getDirr('A').catch(err => expect(err.message).toBe("Error occured"))
    done();

  });




});

