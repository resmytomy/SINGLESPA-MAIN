import { TestBed } from '@angular/core/testing';

import { HardwareDetailsService } from './hardware-details.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HardwareDetailsService', () => {
  let httpTestingController: HttpTestingController;
  let service: HardwareDetailsService;
  const fakeResp={"system":{"manufacturer":"Dell Inc.","model":"Latitude 7300","version":"","serial":"6ZMB8Y2","uuid":"4C4C4544-005A-4D10-8042-B6C04F385932","sku":"08E0"},"bios":{"vendor":"Dell Inc.","version":"DELL   - 1072009","releaseDate":"2019-04-30","revision":""},"baseBoard":{"manufacturer":"Dell Inc.","model":"0PYRY5","version":"A00","serial":"/6ZMB8Y2/CNCMK009870239/","assetTag":""},"chassis":{"manufacturer":"Dell Inc.","model":"","type":"Notebook","version":"","serial":"6ZMB8Y2","assetTag":"","sku":""}};

  beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [HardwareDetailsService],
    
  });

  service = TestBed.get(HardwareDetailsService);
  httpTestingController = TestBed.get(HttpTestingController);
});
it('should be created', () => {
    const service: HardwareDetailsService = TestBed.get(HardwareDetailsService);
    expect(service).toBeTruthy();
  });
  it('should get the details ',()=>{
    
    service.getHardWareDetails().subscribe((data) => {
      expect(data).toEqual(fakeResp);
    });

    const request = httpTestingController.expectOne('http://localhost:8888/');
    expect(request.request.method).toBe('GET');
    request.flush(fakeResp);
  });
});
