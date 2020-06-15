import { TestBed } from '@angular/core/testing';
import { FileEditorService } from './file-editor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FileEditorService', () => {
  let httpTestingController: HttpTestingController;
  const fakeResp = "Prefix12=${appdata}\nsuffix12123=${appdata}";

  const fakeRespAfterUpdate = "Prefix12=${appdata}\nsuffix12123=${appdata}\nNew=NewValue"
  let service: FileEditorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileEditorService],
    });
    service = TestBed.get(FileEditorService);
    httpTestingController = TestBed.get(HttpTestingController);

  });
  it('should be created', () => {
    const service: FileEditorService = TestBed.get(FileEditorService);
    expect(service).toBeTruthy();
  });
  it('should get the file content ', () => {

    service.getfileContent().subscribe((data) => {
      expect(data).toEqual(fakeResp);
    });

    const request = httpTestingController.expectOne('http://localhost:8098/');
    expect(request.request.method).toBe('GET');
    request.flush(fakeResp);
  });

  it('should post the file content ', () => {

    service.updateFileContents('123343').subscribe((data) => {
      expect(data).toEqual(fakeRespAfterUpdate);
    });

    const request = httpTestingController.expectOne('http://localhost:8098/edit/');
    expect(request.request.method).toBe('POST');
    request.flush(fakeRespAfterUpdate);
  });
});
