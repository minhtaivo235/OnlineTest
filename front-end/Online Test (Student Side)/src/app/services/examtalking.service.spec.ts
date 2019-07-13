import { TestBed } from '@angular/core/testing';

import { ExamtalkingService } from './examtalking.service';

describe('ExamtalkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamtalkingService = TestBed.get(ExamtalkingService);
    expect(service).toBeTruthy();
  });
});
