import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucionMatriculaComponent } from './evolucion-matricula.component';

describe('EvolucionMatriculaComponent', () => {
  let component: EvolucionMatriculaComponent;
  let fixture: ComponentFixture<EvolucionMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolucionMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucionMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
