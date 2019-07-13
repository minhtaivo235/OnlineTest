import { TestBed } from '@angular/core/testing';

import { GrouptestService } from './grouptest.service';

describe('GrouptestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrouptestService = TestBed.get(GrouptestService);
    expect(service).toBeTruthy();
  });
});
