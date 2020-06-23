import { TestBed } from '@angular/core/testing';

import { CpuDetailsService } from './cpu-details.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CpuDetailsService', () => {
  let service: CpuDetailsService;
  const fakeResp="6.14.4"

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CpuDetailsService],
    });

    service = TestBed.get(CpuDetailsService);
    httpTestingController = TestBed.get(HttpTestingController);

  });
  it('should be created', () => {
    const service: CpuDetailsService = TestBed.get(CpuDetailsService);
    expect(service).toBeTruthy();
  });
  it('should get result of the command ',()=>{
    
    service.getCpuDetails().subscribe((data) => {
      expect(data).toEqual(fakeResp);
    });

    const request = httpTestingController.expectOne('http://localhost:8777/');
    expect(request.request.method).toBe('GET');
    request.flush(fakeResp);
  });
});
