import { TestBed, inject } from '@angular/core/testing';

import { InternationalizationService } from './internationalization.service';

describe('InternationalizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternationalizationService]
    });
  });

  it('should be created', inject([InternationalizationService], (service: InternationalizationService) => {
    expect(service).toBeTruthy();
  }));
});
