import { TestBed } from '@angular/core/testing';

import { TestTypeService } from './test_type.service';

describe('TestTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestTypeService = TestBed.get(TestTypeService);
    expect(service).toBeTruthy();
  });
});
