import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdEvolucionMatriculaComponent } from './td-evolucion-matricula.component';

describe('TdEvolucionMatriculaComponent', () => {
  let component: TdEvolucionMatriculaComponent;
  let fixture: ComponentFixture<TdEvolucionMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdEvolucionMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdEvolucionMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
