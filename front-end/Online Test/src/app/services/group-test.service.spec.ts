import { TestBed } from '@angular/core/testing';

import { GroupTestService } from './group-test.service';

describe('GroupTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupTestService = TestBed.get(GroupTestService);
    expect(service).toBeTruthy();
  });
});
