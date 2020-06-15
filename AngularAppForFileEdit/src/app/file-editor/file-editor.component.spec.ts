import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import {FileEditorService} from '../service/file-editor.service'
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const createTranslateLoader = function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const spy = jasmine.createSpy('spy');


import { FileEditorComponent } from './file-editor.component';

describe('FileEditorComponent', () => {
  let component: FileEditorComponent;
  let fixture: ComponentFixture<FileEditorComponent>;
  let httpTestingController: HttpTestingController;
  let service: FileEditorService;
 let translate: TranslateService;
 const fakeResp="Prefix12=${appdata}\nsuffix12123=${appdata}"
 const fakeRespAfterUpdate="Prefix12=${appdata}\nsuffix12123=${appdata}\nNew=NewValue"

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        })
      ],
      declarations: [FileEditorComponent]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
    service = TestBed.get(FileEditorService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FileEditorComponent);
    component = fixture.componentInstance;
    component.fileContentList=[ {
      index:0,
      name: "Prefix12",
      value:"${appdata}"
    },
    {
      index:1,
      name: "suffix12123",
      value:"${appdata}"
    }
  ]
    fixture.detectChanges();
    window.addEventListener('languageTranslation', spy);

  });

  it('should create file editor component ', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnit() and from ngOnit it should call getfileContent()', () => {
    const spy = spyOn(component, 'getfileContent');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });



  it('should call add on clicking button ADd Row', async(() => {
    spyOn(component, 'add');  
    let button = fixture.debugElement.query(By.css('#add'));
    const native=button.nativeElement;
    const buttonElem=native; 
    buttonElem.click();  
    fixture.whenStable().then(() => {
      expect(component.add).toHaveBeenCalled();
    });
  }));
  
  it ('should add new element when clicking on  add ',()=>{
    component.add();
    expect(component.fileContentList.length  ).toEqual(3);

  })
  it ('should update the list while calling updateList', ()=>{    
    component.updateList(0,'name',{    
      "target": {
        "textContent":"AppData" 
      }
    });
    expect(component.fileContentList[0] ).toEqual( {
      index:0,
      name: "AppData",
      value:"${appdata}"
    });


  });


it("should call getfileContent and return fileContent", async(() => {
 
  spyOn(service, 'getfileContent').and.returnValue(of(fakeResp))
  component.getfileContent();
  fixture.detectChanges();
  service.getfileContent().subscribe(
    (res) => {
      expect(component.response).toBe(res);
  
    }, (error) => {
      expect(component.response).toBe(error);

    });
  }));

  it(" getfilecontent should return error is there is an error from server", async(() => {
    const mockCall = spyOn(service, 'getfileContent')
    .and.returnValue(throwError({status: 404}));
    component.getfileContent();
    fixture.detectChanges();
    service.getfileContent().subscribe(
      (res) => {
        expect(component.response).toBe(res);
    
      }, (error) => {
        expect(component.errorMessage).toBe(error);
  
      });
  
  
  }));
 
    it("should call updateFileContents and return fileContent", async(() => {
 
      spyOn(service, 'updateFileContents').and.returnValue(of(fakeRespAfterUpdate))
      component.updateAll();
      fixture.detectChanges();
      service.updateFileContents(component.fileContentList).subscribe(
        (res) => {
          expect(component.response).toBe(res);
      
        }, (error) => {
          expect(component.errorMessage).toBe(error);
    
        });
 

}));
it(" updateFileContents should return error is there is an error from server", async(() => {
  spyOn(service, 'updateFileContents').and.returnValue(throwError({status: 404}));
  component.updateAll();
  fixture.detectChanges();
  service.updateFileContents(component.fileContentList).subscribe(
    (res) => {
      expect(component.response).toBe(res);
  
    }, (error) => {
      expect(component.errorMessage).toBe(error);

    });


}));
it('should test the event languageTranslation ', async(() => {

  const customEvent = new CustomEvent('languageTranslation', { detail: 'ML' });
  window.dispatchEvent(customEvent);
  component.eventsCreation();
  expect(spy).toHaveBeenCalled();
}))

it('should call tstfunction ', async(() => {

  var testobj = {
    testFunction: (lang) => {
      //this.translate.use(lang); 
    }

  }

  window.dispatchEvent(new CustomEvent('LangChangeEvent', { detail: { testobj } }));
  window.addEventListener('LangChangeEvent', (evt: CustomEvent) => {

    evt.detail.testobj.testFunction("MALLL");

  })
  const xService = fixture.debugElement.injector.get(TranslateService);
  const mockCall = spyOn(xService, 'use');
  component.eventsCreation();
  expect(mockCall).toHaveBeenCalled();


}))

});