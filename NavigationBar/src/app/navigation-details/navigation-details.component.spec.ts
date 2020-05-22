import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDetailsComponent } from './navigation-details.component';

describe('NavigationDetailsComponent', () => {
  let component: NavigationDetailsComponent;
  let fixture: ComponentFixture<NavigationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
