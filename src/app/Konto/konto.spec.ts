import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KontoPage } from './kontoController';

describe('KontoPage', () => {
  let component: KontoPage;
  let fixture: ComponentFixture<KontoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KontoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
