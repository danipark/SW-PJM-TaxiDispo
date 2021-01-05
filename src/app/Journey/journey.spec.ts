import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { JourneyPage } from './journeyController';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormBuilder } from '@angular/forms';

describe('JourneyPage', () => {
  let component: JourneyPage;
  let fixture: ComponentFixture<JourneyPage>;
  let geolocationSpy, jwtHelperSpy, jwtOptionsSpy, storageSpy, formBuilderSpy;

  beforeEach(async(() => {
    geolocationSpy = jasmine.createSpy('Geolocation')
    jwtHelperSpy = jasmine.createSpy('JwtHelperService');
    jwtOptionsSpy = jasmine.createSpy('JWT_OPTIONS');
    storageSpy = jasmine.createSpy('Storage');
    formBuilderSpy = jasmine.createSpy('FormBuilder')

    TestBed.configureTestingModule({
      declarations: [JourneyPage],
      providers: [
        { provide: Geolocation, useValue: geolocationSpy},
        { provide: JWT_OPTIONS, useValue: jwtOptionsSpy},
        { provide: JwtHelperService, useValue: jwtHelperSpy},
        { provide: Storage, useValue: storageSpy},
        { provide: FormBuilder, useValue: formBuilderSpy}

      ],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
