import { TestBed } from '@angular/core/testing';

import { BaseapiService } from './baseapi.service';

describe('BaseapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseapiService = TestBed.get(BaseapiService);
    expect(service).toBeTruthy();
  });
});
