import { TestBed } from '@angular/core/testing';

import { TakerService } from './taker.service';

describe('TakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TakerService = TestBed.get(TakerService);
    expect(service).toBeTruthy();
  });
});
