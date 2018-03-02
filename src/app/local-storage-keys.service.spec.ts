import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageKeysService } from './local-storage-keys.service';

describe('LocalStorageKeysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageKeysService]
    });
  });

  it('should be created', inject([LocalStorageKeysService], (service: LocalStorageKeysService) => {
    expect(service).toBeTruthy();
  }));
});
