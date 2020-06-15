import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerComponent } from './logger.component';
const spy = jasmine.createSpy('spy');

describe('LoggerComponent', () => {
  let component: LoggerComponent;
  let fixture: ComponentFixture<LoggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.addEventListener('logging-event', spy);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test thelogging event ', async(() => {

    const customEvent = new CustomEvent('logging-event', { detail: 'Logs' });
    window.dispatchEvent(customEvent);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  }))
});
