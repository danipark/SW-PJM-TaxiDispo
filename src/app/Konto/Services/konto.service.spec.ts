import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";

import { KontoService } from "./konto.service";

describe("KontoService", () => {
  let service: KontoService;
  let jwtHelperSpy, jwtOptionsSpy;

  beforeEach(() => {
    jwtHelperSpy = jasmine.createSpy("JwtHelperService");
    jwtOptionsSpy = jasmine.createSpy("JWT_OPTIONS");

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: JWT_OPTIONS, useValue: jwtOptionsSpy },
        { provide: JwtHelperService, useValue: jwtHelperSpy },
      ],
    });
    service = TestBed.inject(KontoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
