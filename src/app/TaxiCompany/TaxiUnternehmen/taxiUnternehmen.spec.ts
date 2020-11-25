import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { TaxiUnternehmenPage } from './taxiUnternehmenController';

describe('TaxiUnternehmenPage', () => {
  let component: TaxiUnternehmenPage;
  let fixture: ComponentFixture<TaxiUnternehmenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxiUnternehmenPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxiUnternehmenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
