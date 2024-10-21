import { TestBed } from '@angular/core/testing';

import { PasstopdfService } from './passtopdf.service';

describe('PasstopdfService', () => {
  let service: PasstopdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasstopdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
