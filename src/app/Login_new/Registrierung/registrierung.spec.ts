import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';
import { RegistrierungPage } from './registrierungController';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';

describe('RegistrierungPage', () => {
  let component: RegistrierungPage;
  let fixture: ComponentFixture<RegistrierungPage>;
  let formBuilderSpy, jwtHelperSpy, jwtOptionsSpy, storageSpy, formsModuleSpy;

  beforeEach(async(() => {
    formBuilderSpy = jasmine.createSpy('FormBuilder');
    jwtHelperSpy = jasmine.createSpy('JwtHelperService');
    jwtOptionsSpy = jasmine.createSpy('JWT_OPTIONS');
    formsModuleSpy = jasmine.createSpy('FormsModule')

    TestBed.configureTestingModule({
      declarations: [RegistrierungPage],
      providers: [
        { provide: FormBuilder, useValue: formBuilderSpy },
        { provide: JWT_OPTIONS, useValue: jwtOptionsSpy },
        { provide: JwtHelperService, useValue: jwtHelperSpy },
        { provide: Storage, useValue: storageSpy },
        { provide: FormsModule, useValue: formsModuleSpy }
      ],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrierungPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

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

    component = TestBed.inject(RegistrierungPage);

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
