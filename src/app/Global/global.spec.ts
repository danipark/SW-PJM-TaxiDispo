import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPage } from './globalController';

describe('GlobalPage', () => {
  let component: GlobalPage;
  let fixture: ComponentFixture<GlobalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
