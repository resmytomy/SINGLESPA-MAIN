import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { TermnalViewService } from './terminal-view.service';

describe('TerminalViewService', () =>{
  let service: TermnalViewService;
  const fakeResp="6.14.4"
  const fakeRespAfterUpdate="Prefix12=${appdata}\nsuffix12123=${appdata}\nNew=NewValue"
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TermnalViewService],
    });

    service = TestBed.get(TermnalViewService);
    httpTestingController = TestBed.get(HttpTestingController);

  });


  it('should be created', () => {
    const service: TermnalViewService = TestBed.get(TermnalViewService);
    expect(service).toBeTruthy();
  });
  it('should get result of the command ',()=>{
    
    service.executeCOmmand('npm --version').subscribe((data) => {
      expect(data).toEqual(fakeResp);
    });

    const request = httpTestingController.expectOne('http://localhost:8095/executeCommand ');
    expect(request.request.method).toBe('POST');
    request.flush(fakeResp);
  });
});
