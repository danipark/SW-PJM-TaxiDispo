import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
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
    let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
  spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
  spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
  spyOn(localStorage, 'removeItem')
    .and.callFake(mockLocalStorage.removeItem);
  spyOn(localStorage, 'clear')
    .and.callFake(mockLocalStorage.clear);

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
