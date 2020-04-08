import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNGUiComponent } from './prime-ng-ui.component';

describe('PrimeNGUiComponent', () => {
  let component: PrimeNGUiComponent;
  let fixture: ComponentFixture<PrimeNGUiComponent>;

  beforeEach(async(() => {
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
