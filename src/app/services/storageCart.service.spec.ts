import { TestBed } from '@angular/core/testing';

import { StorageCartService } from './storageCart.service';

describe('StorageCartService', () => {
  let service: StorageCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
