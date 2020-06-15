import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import {HardwareDetailsService} from '../service/hardware-details.service';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const createTranslateLoader = function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const spy = jasmine.createSpy('spy');

import { HardwareDetailsComponent } from './hardware-details.component';

describe('HardwareDetailsComponent', () => {
  let component: HardwareDetailsComponent;
  let fixture: ComponentFixture<HardwareDetailsComponent>;
  let httpTestingController: HttpTestingController;
  let service: HardwareDetailsService;
 let translate: TranslateService;
 let mockRes={"system":{"manufacturer":"Dell Inc.","model":"Latitude 7300","version":"","serial":"6ZMB8Y2","uuid":"4C4C4544-005A-4D10-8042-B6C04F385932","sku":"08E0"},"bios":{"vendor":"Dell Inc.","version":"DELL   - 1072009","releaseDate":"2019-04-30","revision":""},"baseBoard":{"manufacturer":"Dell Inc.","model":"0PYRY5","version":"A00","serial":"/6ZMB8Y2/CNCMK009870239/","assetTag":""},"chassis":{"manufacturer":"Dell Inc.","model":"","type":"Notebook","version":"","serial":"6ZMB8Y2","assetTag":"","sku":""}};
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
      declarations: [ HardwareDetailsComponent ]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
    service = TestBed.get(HardwareDetailsService);
    httpTestingController = TestBed.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.addEventListener('languageTranslation', spy);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch languageTranslation event' , async(() => {

    const customEvent = new CustomEvent('languageTranslation', { detail: 'ML' });
    window.dispatchEvent(customEvent);
    component.eventsCreation();
    expect(spy).toHaveBeenCalled();
    
  }))

  it('should call tstfunction ', async(() => {

    var testobj = {
      testFunction: (lang) => {
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

  it("should call getCpuDetails and return details", async(() => {


    spyOn(service, 'getHardWareDetails').and.returnValue(of(mockRes))
    component.getHardWareDetails();
    fixture.detectChanges();
    service.getHardWareDetails().subscribe(
      (res) => {
        expect(component.systemInfo).toBe(res.system);
        expect(component.biosInfo).toBe(res.bios);
        expect(component.baseBoardInfo).toBe(res.baseBoard);
        expect(component.chassisInfo).toBe(res.chassis);


      }, (error) => {
        expect(component.errorMessage).toBe(error);

      });
  }));
  it("should call getCpuDetails and return error if there is any", async(() => {


    spyOn(service, 'getHardWareDetails').and.returnValue(throwError({ status: 404 }))
    component.getHardWareDetails();
    fixture.detectChanges();
    service.getHardWareDetails().subscribe(
      (res) => {
        expect(component.systemInfo).toBe(res.system);
        expect(component.biosInfo).toBe(res.bios);
        expect(component.baseBoardInfo).toBe(res.baseBoard);
        expect(component.chassisInfo).toBe(res.chassis);


      }, (error) => {
        expect(component.errorMessage).toBe(error);

      });
  }));

});
