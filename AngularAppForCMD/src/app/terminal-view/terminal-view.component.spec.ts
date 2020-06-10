import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TerminalViewComponent } from './terminal-view.component';
import { By } from '@angular/platform-browser';
import { TermnalViewService } from '../service/terminal-view.service';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const createTranslateLoader = function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const spy = jasmine.createSpy('spy');

describe('Terminal View Component ', () => {
  let httpTestingController: HttpTestingController;
  let component: TerminalViewComponent;
  let fixture: ComponentFixture<TerminalViewComponent>;
  let service: TermnalViewService;
  let translate: TranslateService;

  const fakeResp = "Prefix12=${appdata}\nsuffix12123=${appdata}"


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
      declarations: [TerminalViewComponent]
    })
      .compileComponents();
    translate = TestBed.get(TranslateService);
    service = TestBed.get(TermnalViewService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.addEventListener('languageTranslation', spy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call executeCOmmand on clicking button ExecuteCommand', async(() => {
    spyOn(component, 'executeCommand');
    let button = fixture.debugElement.query(By.css('#ExecuteCommand'));
    const native = button.nativeElement;
    const buttonElem = native;
    buttonElem.click();
    console.log('butttton con', buttonElem.textContent);
    buttonElem.click();
    fixture.whenStable().then(() => {
      expect(component.executeCommand).toHaveBeenCalled();
    });
  }));



  it("should call executeCOmmand and return the reuslt", async(() => {


    spyOn(service, 'executeCOmmand').and.returnValue(of(fakeResp))
    component.executeCommand('ng --version');
    fixture.detectChanges();
    service.executeCOmmand('ng --version').subscribe(
      (res) => {
        expect(component.result).toBe(res);

      }, (error) => {
        expect(component.result).toBe(error);

      });
  }));
  it("should call executeCOmmand and return error if any", async(() => {


    spyOn(service, 'executeCOmmand').and.returnValue(throwError({ status: 404 }))
    component.executeCommand('ng --version');
    fixture.detectChanges();
    service.executeCOmmand('ng --version').subscribe(
      (res) => {
        expect(component.result).toBe(res);

      }, (error) => {
        expect(component.errorMessage).toBe(error);

      });
    expect(TerminalViewComponent.previousCommands).toContain('ng --version');
  }));
  it("copy command should copy the command to text editor", async(() => {


    component.copy('cd ..');
    fixture.detectChanges();

    expect(component.command).toBe('cd ..');

  }));

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


});
