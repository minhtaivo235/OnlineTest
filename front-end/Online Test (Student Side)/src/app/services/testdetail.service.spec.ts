import { TestBed } from '@angular/core/testing';

import { TestdetailService } from './testdetail.service';

describe('TestdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestdetailService = TestBed.get(TestdetailService);
    expect(service).toBeTruthy();
  });
});
