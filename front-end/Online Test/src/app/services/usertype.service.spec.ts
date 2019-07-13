import { TestBed } from '@angular/core/testing';

import { UsertypeService } from './usertype.service';

describe('UsertypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsertypeService = TestBed.get(UsertypeService);
    expect(service).toBeTruthy();
  });
});
