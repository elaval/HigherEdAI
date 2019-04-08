import { TestBed } from '@angular/core/testing';

import { S3ServiceService } from './s3-service.service';

describe('S3ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: S3ServiceService = TestBed.get(S3ServiceService);
    expect(service).toBeTruthy();
  });
});
