import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RxjsLibraryComponent } from './rxjs-library.component';

describe('RxjsLibraryComponent', () => {
  let component: RxjsLibraryComponent;
  let fixture: ComponentFixture<RxjsLibraryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
