import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtHelperSpy, jwtOptionsSpy, storageSpy;
  const storageIonicMock: any = {
    get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
  }
  beforeEach(() => {
    jwtHelperSpy = jasmine.createSpy('JwtHelperService');
    jwtOptionsSpy = jasmine.createSpy('JWT_OPTIONS');

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: JWT_OPTIONS, useValue: jwtOptionsSpy},
        { provide: JwtHelperService, useValue: jwtHelperSpy},
        { provide: Storage, useValue: storageIonicMock},

      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    () => {
      expect(service).toBeTruthy();
    }
  });
});
