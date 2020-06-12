import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import {CpuDetailsService} from '../service/cpu-details.service'
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const createTranslateLoader = function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const spy = jasmine.createSpy('spy');


import { CpuDetailsComponent } from './cpu-details.component';

describe('CpuDetailsComponent', () => {
  let component: CpuDetailsComponent;
  let fixture: ComponentFixture<CpuDetailsComponent>;
  let httpTestingController: HttpTestingController;
   let service: CpuDetailsService;
  let translate: TranslateService;
  let mockRes={"cpu":{"manufacturer":"Intel®","brand":"Core™ i7-8665U","vendor":"GenuineIntel","family":"6","model":"142","stepping":"12","revision":"","voltage":"","speed":"1.90","speedmin":"","speedmax":"2.11","governor":"","cores":8,"physicalCores":4,"processors":1,"socket":"BGA1528","cache":{"l1d":0,"l1i":0,"l2":1048576,"l3":8388608}},"battery":{"hasbattery":true,"cyclecount":0,"ischarging":false,"designedcapacity":0,"maxcapacity":0,"currentcapacity":0,"voltage":11.095,"capacityUnit":"mWh","percent":28,"timeremaining":-1,"acconnected":false,"type":"","model":"","manufacturer":"","serial":"","designcapacity":0}}

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
      declarations: [CpuDetailsComponent]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
    service = TestBed.get(CpuDetailsService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.addEventListener('languageTranslation', spy);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should', async(() => {

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
  it("should call getCpuDetails and return details", async(() => {


    spyOn(service, 'getCpuDetails').and.returnValue(of(mockRes))
    component.getcpuDetails();
    fixture.detectChanges();
    service.getCpuDetails().subscribe(
      (res) => {
        expect(component.cpuInfo).toBe(res.cpu);
        expect(component.batteryInfo).toBe(res.battery);

      }, (error) => {
        expect(component.errorMessage).toBe(error);

      });
  }));

  it("should call getCpuDetails and return error if there is any", async(() => {


    spyOn(service, 'getCpuDetails').and.returnValue(throwError({ status: 404 }))
    component.getcpuDetails();
    fixture.detectChanges();
    service.getCpuDetails().subscribe(
      (res) => {
        expect(component.cpuInfo).toBe(res.cpu);
        expect(component.batteryInfo).toBe(res.battery);

      }, (error) => {
        expect(component.errorMessage).toBe(error);

      });
  }));
});
