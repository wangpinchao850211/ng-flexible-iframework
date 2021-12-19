import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrimeNGUiComponent } from './prime-ng-ui.component';

describe('PrimeNGUiComponent', () => {
  let component: PrimeNGUiComponent;
  let fixture: ComponentFixture<PrimeNGUiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeNGUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeNGUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
