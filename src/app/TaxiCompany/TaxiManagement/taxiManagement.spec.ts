import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { TaxiManagementPage } from './taxiManagementController';

describe('TaxiManagementPage', () => {
  let component: TaxiManagementPage;
  let fixture: ComponentFixture<TaxiManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxiManagementPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxiManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
