import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareDetailsComponent } from './hardware-details.component';

describe('HardwareDetailsComponent', () => {
  let component: HardwareDetailsComponent;
  let fixture: ComponentFixture<HardwareDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
