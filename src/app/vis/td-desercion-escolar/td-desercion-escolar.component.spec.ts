import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdDesercionEscolarComponent } from './td-desercion-escolar.component';

describe('TdDesercionEscolarComponent', () => {
  let component: TdDesercionEscolarComponent;
  let fixture: ComponentFixture<TdDesercionEscolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdDesercionEscolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdDesercionEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
