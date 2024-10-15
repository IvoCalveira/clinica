import { TestBed } from '@angular/core/testing';

import { PasstocsvService } from './passtocsv.service';

describe('PasstocsvService', () => {
  let service: PasstocsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasstocsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
