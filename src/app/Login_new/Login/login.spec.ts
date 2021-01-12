import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from './loginController';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let geolocationSpy, jwtHelperSpy, jwtOptionsSpy, storageSpy, 
  formBuilderSpy, urlSerializerSpy;

  beforeEach(async(() => {
    geolocationSpy = jasmine.createSpy('Geolocation')
    jwtHelperSpy = jasmine.createSpy('JwtHelperService');
    jwtOptionsSpy = jasmine.createSpy('JWT_OPTIONS');
    formBuilderSpy = jasmine.createSpy('FormBuilder')
    urlSerializerSpy = jasmine.createSpy('UrlSerializer')

    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [
        { provide: Geolocation, useValue: geolocationSpy},
        { provide: JWT_OPTIONS, useValue: jwtOptionsSpy},
        { provide: JwtHelperService, useValue: jwtHelperSpy},
        { provide: Storage, useValue: storageSpy},
        { provide: FormBuilder, useValue: formBuilderSpy},
        { provide: UrlSerializer, useValue: urlSerializerSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

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

    component = TestBed.inject(LoginPage);

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
