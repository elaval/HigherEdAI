import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdOrigenEscolarComponent } from './td-origen-escolar.component';

describe('TdOrigenEscolarComponent', () => {
  let component: TdOrigenEscolarComponent;
  let fixture: ComponentFixture<TdOrigenEscolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdOrigenEscolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdOrigenEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
