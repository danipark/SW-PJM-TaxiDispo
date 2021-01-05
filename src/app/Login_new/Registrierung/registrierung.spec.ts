import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';
import { RegistrierungPage } from './registrierungController';
import { Storage } from '@ionic/storage';

describe('RegistrierungPage', () => {
  let component: RegistrierungPage;
  let fixture: ComponentFixture<RegistrierungPage>;
  let formBuilderSpy, jwtHelperSpy, jwtOptionsSpy, storageSpy, formsModuleSpy;

  beforeEach(async(() => {
    formBuilderSpy = jasmine.createSpy('FormBuilder');
    jwtHelperSpy = jasmine.createSpy('JwtHelperService');
    jwtOptionsSpy = jasmine.createSpy('JWT_OPTIONS');
    storageSpy = jasmine.createSpy('Storage');
    formsModuleSpy = jasmine.createSpy('FormsModule')
    
    TestBed.configureTestingModule({
      declarations: [ RegistrierungPage ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderSpy},
        { provide: JWT_OPTIONS, useValue: jwtOptionsSpy},
        { provide: JwtHelperService, useValue: jwtHelperSpy},
        { provide: Storage, useValue: storageSpy},
        { provide: FormsModule, useValue: formsModuleSpy}

      ],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrierungPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
