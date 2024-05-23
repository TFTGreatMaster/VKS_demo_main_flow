import { TestBed } from '@angular/core/testing';

import { DetailVuAnService } from './detail-vu-an.service';

describe('DetailVuAnService', () => {
  let service: DetailVuAnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailVuAnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
