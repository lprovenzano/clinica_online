import { TestBed } from '@angular/core/testing';

import { ApprovedGuard } from './approved.guard';

describe('ApprovedGuard', () => {
  let guard: ApprovedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ApprovedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
