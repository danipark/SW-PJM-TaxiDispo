import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let jwtHelperSpy, jwtOptionsSpy, storageSpy;
  
  beforeEach(() => {
    jwtHelperSpy = jasmine.createSpy('JwtHelperService');
    jwtOptionsSpy = jasmine.createSpy('JWT_OPTIONS');

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: JWT_OPTIONS, useValue: jwtOptionsSpy},
        { provide: JwtHelperService, useValue: jwtHelperSpy},
        { provide: Storage, useValue: storageSpy},

      ]
    });
    var localStorage = window.localStorage;
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
        store = {};
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    () => {
      expect(service).toBeTruthy();
    }
  });
});
