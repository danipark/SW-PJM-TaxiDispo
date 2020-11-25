import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrierungPage } from './registrierung.page';

describe('RegistrierungPage', () => {
  let component: RegistrierungPage;
  let fixture: ComponentFixture<RegistrierungPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrierungPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrierungPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
