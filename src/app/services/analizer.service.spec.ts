import { TestBed } from '@angular/core/testing';

import { AnalizerService } from './analizer.service';

describe('AnalizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalizerService = TestBed.get(AnalizerService);
    expect(service).toBeTruthy();
  });
});
