import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouterNavigationComponent } from './router-navigation.component';

describe('RouterNavigationComponent', () => {
  let component: RouterNavigationComponent;
  let fixture: ComponentFixture<RouterNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
