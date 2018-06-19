import { TestBed, inject } from '@angular/core/testing';

import { OrcuiTooltipService } from './orcui-tooltip.service';

describe('OrcuiTooltipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrcuiTooltipService]
    });
  });

  it('should be created', inject([OrcuiTooltipService], (service: OrcuiTooltipService) => {
    expect(service).toBeTruthy();
  }));
});
