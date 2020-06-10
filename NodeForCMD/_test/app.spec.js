const supertest = require('supertest');
jest.mock('fs');
const fs = require("fs");
const app = require('../server');
describe("Testing the API for file manipulation", () => {


     it("should execute the command on post ", done => {
        let req = {
            'data': ['npm --version']        
        }
        supertest(app)
            .post("/executeCommand").send(req)
            .then(response => {
                expect(response.toBeTruthy);
               
            })
            done();
       
    });



})