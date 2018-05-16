import { TestBed, inject } from '@angular/core/testing';

import { FirstRunGuardService } from './first-run-guard.service';

describe('FirstRunGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstRunGuardService]
    });
  });

  it('should be created', inject([FirstRunGuardService], (service: FirstRunGuardService) => {
    expect(service).toBeTruthy();
  }));
});
