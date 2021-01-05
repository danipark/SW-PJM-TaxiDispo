import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TaxiService } from './taxi.service';

describe('TaxiService', () => {
  let service: TaxiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TaxiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
