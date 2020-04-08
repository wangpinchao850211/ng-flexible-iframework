import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyloadComponent } from './lazyload.component';

describe('LazyloadComponent', () => {
  let component: LazyloadComponent;
  let fixture: ComponentFixture<LazyloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
