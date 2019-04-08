import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEscolarComponent } from './ficha-escolar.component';

describe('FichaEscolarComponent', () => {
  let component: FichaEscolarComponent;
  let fixture: ComponentFixture<FichaEscolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaEscolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
