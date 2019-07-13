import { TestBed } from '@angular/core/testing';

import { AnswertypeService } from './answertype.service';

describe('AnswertypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnswertypeService = TestBed.get(AnswertypeService);
    expect(service).toBeTruthy();
  });
});
