import { TestBed, inject } from '@angular/core/testing';

import { OrchidNetService } from './orchid-net.service';

describe('OrchidNetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrchidNetService]
    });
  });

  it('should be created', inject([OrchidNetService], (service: OrchidNetService) => {
    expect(service).toBeTruthy();
  }));
});
