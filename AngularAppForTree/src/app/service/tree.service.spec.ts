import { TestBed } from '@angular/core/testing';

import { TreeService } from './tree.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TreeService', () => {
  let service: TreeService;
  const fakeResp= {
    showChildren: false,
    name: 'A',
    type: 'folder',
    children: [ {  name: 'TextDoc.rtf',  showChildren: true, type: 'file',
        children: []  },    {    showChildren: false, name: 'B', type: 'folder',
        children: [Array]  }   ] };
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TreeService],
    });
    service = TestBed.get(TreeService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tree structure ',()=>{
    
    service.getHardWareDetails().subscribe((data) => {
      expect(data).toEqual(fakeResp);
    });

    const request = httpTestingController.expectOne('http://localhost:8885/');
    expect(request.request.method).toBe('GET');
    request.flush(fakeResp);
  });
});
