import { TestBed } from '@angular/core/testing';

import { MatriculaEvolucionLayoutService } from './matricula-evolucion-layout.service';

describe('MatriculaEvolucionLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatriculaEvolucionLayoutService = TestBed.get(MatriculaEvolucionLayoutService);
    expect(service).toBeTruthy();
  });
});
