import { TestBed, inject } from '@angular/core/testing';

import { DemoWarningService } from './demo-warning.service';

describe('DemoWarningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoWarningService]
    });
  });

  it('should be created', inject([DemoWarningService], (service: DemoWarningService) => {
    expect(service).toBeTruthy();
  }));
});
