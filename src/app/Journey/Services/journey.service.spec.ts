import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { JourneyService } from './journey.service';

describe('JourneyService', () => {
  let service: JourneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(JourneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});