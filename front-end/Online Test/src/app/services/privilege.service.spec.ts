import { TestBed } from '@angular/core/testing';

import { PrivilegeService } from './privilege.service';

describe('PrivilegeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivilegeService = TestBed.get(PrivilegeService);
    expect(service).toBeTruthy();
  });
});
