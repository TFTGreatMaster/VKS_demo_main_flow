import { TestBed } from '@angular/core/testing';

import { VuAnService } from './vu-an.service';

describe('VuAnService', () => {
  let service: VuAnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VuAnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
