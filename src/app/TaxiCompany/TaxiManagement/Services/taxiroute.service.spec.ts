import { TestBed } from '@angular/core/testing';

import { TaxirouteService } from './taxiroute.service';

describe('TaxirouteService', () => {
  let service: TaxirouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxirouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});