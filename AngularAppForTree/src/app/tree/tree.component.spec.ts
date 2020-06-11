import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import {TreeService} from '../service/tree.service'
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const createTranslateLoader = function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const spy = jasmine.createSpy('spy');
import { TreeComponent } from './tree.component';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  let httpTestingController: HttpTestingController;
   let service: TreeService;
  let translate: TranslateService;
  const fakeResp= {
    showChildren: false,
    name: 'A',
    type: 'folder',
    children: [ {  name: 'TextDoc.rtf',  showChildren: true, type: 'file',
        children: []  },    {    showChildren: false, name: 'B', type: 'folder',
        children: [Array]  }   ] };
  
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
      // providers: [TranslateService],
      declarations: [TreeComponent]
    })
      .compileComponents();
    translate = TestBed.get(TranslateService);
    service = TestBed.get(TreeService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.addEventListener('languageTranslation', spy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should  call getHardWareDetails', () => {
    spyOn(service, 'getHardWareDetails').and.returnValue(of(fakeResp));
    component.getHardWareDetails();
    fixture.detectChanges();
    service.getHardWareDetails().subscribe(
      (res) => {
        expect(component.data).toBe(res);

      }, (error) => {
        expect(component.errorMessage).toBe(error);

      });
      fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.toggle'));
    console.log('button',button)
    const native = button.nativeElement;
    const buttonElem = native;
    buttonElem.click();
    console.log('butttton con', buttonElem.textContent);
    buttonElem.click();
    fixture.whenStable().then(() => {
      expect(component.toggleChild).toHaveBeenCalled();
    });
  });

  it('should return error if therer is any from service ', () => {
    spyOn(service, 'getHardWareDetails').and.returnValue(throwError({ status: 404 }));
    component.getHardWareDetails();
    fixture.detectChanges();
    service.getHardWareDetails().subscribe(
      (res) => {
        expect(component.data).toBe(res);

      }, (error) => {
        expect(component.errorMessage).toBe(error);

      });


      
  });
  it('should dispatch the language transaltion event ', async(() => {

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


  }));
  



});
