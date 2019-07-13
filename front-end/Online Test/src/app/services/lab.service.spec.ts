import { TestBed } from '@angular/core/testing';

import { LabService } from './lab.service';

describe('LabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabService = TestBed.get(LabService);
    expect(service).toBeTruthy();
  });
});
