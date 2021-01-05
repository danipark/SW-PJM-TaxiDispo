import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';


import { TaxiUnternehmenPage } from './taxiUnternehmenController';

describe('TaxiUnternehmenPage', () => {
  let component: TaxiUnternehmenPage;
  let fixture: ComponentFixture<TaxiUnternehmenPage>;
  let routerSpy, formBuilderSpy;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpy('Router');
    formBuilderSpy = jasmine.createSpy('FormBuilder');

    TestBed.configureTestingModule({
      declarations: [TaxiUnternehmenPage],
      imports: [HttpClientModule],
      providers: [
        { provide: Router, useValue: routerSpy},
        { provide: FormBuilder, useValue: formBuilderSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxiUnternehmenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
