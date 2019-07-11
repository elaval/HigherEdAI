import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesercionEsComponent } from './desercion-es.component';

describe('DesercionEsComponent', () => {
  let component: DesercionEsComponent;
  let fixture: ComponentFixture<DesercionEsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesercionEsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesercionEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
