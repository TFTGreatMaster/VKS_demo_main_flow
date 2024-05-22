import { TestBed } from '@angular/core/testing';

import { TaiLieuService } from './tai-lieu.service';

describe('TaiLieuService', () => {
  let service: TaiLieuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaiLieuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
