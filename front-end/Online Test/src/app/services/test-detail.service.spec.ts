import { TestBed } from '@angular/core/testing';

import { TestDetailService } from './test-detail.service';

describe('TestDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestDetailService = TestBed.get(TestDetailService);
    expect(service).toBeTruthy();
  });
});
