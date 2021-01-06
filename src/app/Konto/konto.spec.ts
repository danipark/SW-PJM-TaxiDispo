import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { IonicModule } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { KontoPage } from "./kontoController";

describe("KontoPage", () => {
  let component: KontoPage;
  let fixture: ComponentFixture<KontoPage>;
  let jwtHelperSpy, jwtOptionsSpy, storageSpy;

  beforeEach(async(() => {
    jwtHelperSpy = jasmine.createSpy("JwtHelperService");
    jwtOptionsSpy = jasmine.createSpy("JWT_OPTIONS");
    storageSpy = jasmine.createSpy("Storage");

    TestBed.configureTestingModule({
      declarations: [KontoPage],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [
        { provide: JWT_OPTIONS, useValue: jwtOptionsSpy },
        { provide: JwtHelperService, useValue: jwtHelperSpy },
        { provide: Storage, useValue: storageSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KontoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
