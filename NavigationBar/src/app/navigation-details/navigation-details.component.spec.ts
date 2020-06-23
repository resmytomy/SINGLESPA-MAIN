import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const createTranslateLoader = function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const spy = jasmine.createSpy('spy');
import { NavigationDetailsComponent } from './navigation-details.component';

describe('NavigationDetailsComponent', () => {
  let component: NavigationDetailsComponent;
  let fixture: ComponentFixture<NavigationDetailsComponent>;
  let httpTestingController: HttpTestingController;
 let translate: TranslateService;

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
      declarations: [NavigationDetailsComponent]
    })
    .compileComponents();
    translate = TestBed.get(TranslateService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.addEventListener('LangChangeEvent', spy);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test the event',()=>{
    var testobj = {
      testFunction: (lang) => {
        //this.translate.use(lang); 
      }  
    }  
    window.dispatchEvent(new CustomEvent('LangChangeEvent', { detail: { testobj } }));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();

    
  })


  
  it('should call changeLang on changing languag', async(() => {
    // spyOn(component, 'changeLang');  
    let select = fixture.debugElement.query(By.css('#lang')).nativeElement;
    spyOn(component, 'changeLang').and.callThrough();;  

    select.value ="ml";  
    select.dispatchEvent(new Event('change'));
    console.log('sellllll',select)
    fixture.detectChanges();
    // fixture.whenStable().then(() => {
      expect(component.changeLang).toHaveBeenCalled();
    // });
  }));
});
