import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsLibraryComponent } from './rxjs-library.component';

describe('RxjsLibraryComponent', () => {
  let component: RxjsLibraryComponent;
  let fixture: ComponentFixture<RxjsLibraryComponent>;

  beforeEach(async(() => {
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
