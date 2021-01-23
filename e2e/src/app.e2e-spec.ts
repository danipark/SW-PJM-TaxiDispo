import { LoginPage } from './page-objects/login.po';
import { PageObjectBase } from './page-objects/base.po';
import { AppPage } from './page-objects/app.po';
import { JourneyPage } from './page-objects/journey.po';
import { browser, by, element, ExpectedConditions } from 'protractor';
import { taxiUnternehmenPage } from './page-objects/taxiUnternehmen.po';

describe('Testfall 1', () => {
  const login = new LoginPage();
  const app = new AppPage();
  const journey = new JourneyPage();
  beforeEach(() => {
    app.load();
  });

  describe('Vor Login', () => {
    it('Login View wird angezeigt', () => {
      expect(login.rootElement().isDisplayed()).toEqual(true);
    });

    it('Login View enthält den Titel "Login"', () => {
      expect(login.getTitle()).toContain('Login')
    });
  })
  describe('Ein Kunde möchte sich in die Taxi-Dispo-Website einloggen ', () => {
    it('Seite Taxi-Buchen wird nach erfolgreichem login angezeigt (Testszenario 1)', () => {
      login.enterEMail('danielkleinen@gmail.com');
      login.enterPassword('admin1');
      login.clickSignIn();
      browser.wait(ExpectedConditions.urlContains('http://localhost:4200/TaxiDispo/journey'), 3000);
    });

    it('Login wird verweigert, weil das Passwort falsch ist (Testszenario 2)', () => {
      login.enterEMail('danielkleinen@gmail.com');
      login.enterPassword('Dumbeldore');
      login.clickSignIn();
      login.waitForError();
      expect(login.getErrorMessage()).toEqual(
        'Die angegebenen Zugangsdaten stimmen nicht überein!'
      );
    });

    it('Login wird verweigert, weil die E-Mail falsch ist (Testszenario 3)', () => {
      login.enterEMail('HaryPotter@gmail.com');
      login.enterPassword('admin1');
      login.clickSignIn();
      login.waitForError();
      expect(login.getErrorMessage()).toEqual(
        'Der Benutzer existiert nicht.'
      );
    });

    it('Login wird verweigert, weil E-Mail & Passwort falsch sind (Testszenario 4)', () => {
      login.enterEMail('HaryPotter@gmail.com');
      login.enterPassword('Dumbeldore');
      login.clickSignIn();
      login.waitForError();
      expect(login.getErrorMessage()).toEqual(
        'Der Benutzer existiert nicht.'
      );
    });
  });

  it('nach erfolgreichem Login ändert User die URL in http://localhost:8100/TaxiDispo/taxiVerwaltung (Testszenario 5', () => {
    login.enterEMail('danielkleinen@gmail.com');
    login.enterPassword('admin1');
    login.clickSignIn();
    browser.wait(ExpectedConditions.urlContains('http://localhost:4200/TaxiDispo/journey'), 3000);
    browser.get('http://localhost:4200/TaxiDispo/taxiVerwaltung');
    browser.wait(ExpectedConditions.urlContains('http://localhost:4200/login'), 3000);
  })
});

describe('Testfall 2', () => {
  const login = new LoginPage();
  const app = new AppPage();
  const journey = new JourneyPage();
  const taxiUnternehmen = new taxiUnternehmenPage();
  beforeEach(() => {
    app.load();
  });

  describe('Vor Login', () => {
    it('Login View wird angezeigt', () => {
      expect(login.rootElement().isDisplayed()).toEqual(true);
    });

    it('Login View enthält den Titel "Login"', () => {
      expect(login.getTitle()).toContain('Login');
    });
  })

  describe('Ein Mitarbeiter möchte sich in die Taxi-Dispo-Website einloggen', () => {
    it('Mitarbeiter loggt sich mit korrekten Anmeldedaten ein (Testszenario 1)', () => {
      login.enterEMail('taxidispo@web.de');
      login.enterPassword('admin1');
      login.clickSignIn();
      browser.wait(ExpectedConditions.urlContains('http://localhost:4200/TaxiDispo/taxiUnternehmen'), 3000);
      expect(taxiUnternehmen.getTitle()).toContain('Taxi verwalten');
      taxiUnternehmen.clickDashboardButton('tab-button-taxiManagement');
      browser.wait(ExpectedConditions.urlContains('http://localhost:4200/TaxiDispo/taxiManagement'), 3000);
    });

    it('Login wird verweigert, weil das Passwort falsch ist (Testszenario 2)', () => {
      login.enterEMail('taxidispo@web.de');
      login.enterPassword('admin321');
      login.clickSignIn();
      login.waitForError();
      expect(login.getErrorMessage()).toEqual(
        'Die angegebenen Zugangsdaten stimmen nicht überein!'
      );
    });

    it('Login wird verweigert, weil die E-Mail falsch ist (Testszenario 3', () => {
      login.enterEMail('taxidisp@web.de');
      login.enterPassword('admin1');
      login.clickSignIn();
      login.waitForError();
      expect(login.getErrorMessage()).toEqual(
        'Der Benutzer existiert nicht.'
      );
    });

    it('Login wird verweigert, weil E-Mail & Passwort falsch sind (Testszenario 4)', () => {
      login.enterEMail('taxidisp@web.de');
      login.enterPassword('admin321');
      login.clickSignIn();
      login.waitForError();
      expect(login.getErrorMessage()).toEqual(
        'Der Benutzer existiert nicht.'
      );
    });
  });
});

describe('Integrationstest: Einloggen als Mitarbeiter und hinzufügen eines Taxis', () => {
  const login = new LoginPage();
  const app = new AppPage();
  const journey = new JourneyPage();
  const taxiUnternehmen = new taxiUnternehmenPage();

  beforeEach(() => {
    app.load();
  });

  describe('Vor Login', () => {
    it('Login View wird angezeigt', () => {
      expect(login.rootElement().isDisplayed()).toEqual(true);
    });

    it('Login View enthält den Titel "Login"', () => {
      expect(login.getTitle()).toContain('Login');
    });
  })

  /* describe('US2: Als Kunde möchte ich meinen Startpunkt flexibel auswählen können', () => {
    it('Ausfüllen aller benötigter Felder (Testszenario 1)', () => {
      login.enterEMail('danielkleinen@gmail.com');
      login.enterPassword('admin1');
      login.clickSignIn();
      browser.wait(ExpectedConditions.urlContains('http://localhost:4200/TaxiDispo/journey'), 3000);
      expect(element(by.css('geocoderziel'))).toBeTruthy();
      browser.sleep(1000);
      //var menuToggleButton = element(by.className('buttons-first-slot sc-ion-buttons-md-h sc-ion-buttons-md-s md hydrated'));
      // menuToggleButton.click();
      //  browser.actions().mouseMove(element(by.css('geocoderziel')));
      //  element(by.css('geocoderziel')).click();
      element(by.css('.mapboxgl-ctrl-geocoder--input')).getWebElement().sendKeys('Furtwangen');
      //journey.autoCompleteSearch('Furtwangen', 1);   
      //  journey.getZielpunktInputFeld().sendKeys('Vöhrenbach');

      //journey.getDatumInputField().sendKeys('2020-02-01');
      //  element(by.id('menuButton')).getWebElement().click();
      browser.sleep(1000);

    });


  }); */
   describe('Als Mitarbeiter möchte ich ein Taxi hinzufügen können', () => {
    it('Taxi hinzufügen', async () => {
      login.enterEMail('taxidispo@web.de');
      login.enterPassword('admin1');
      login.clickSignIn();
      browser.wait(ExpectedConditions.urlContains('http://localhost:4200/TaxiDispo/taxiUnternehmen'), 3000);
      expect(taxiUnternehmen.getTitle()).toContain('Taxi verwalten');
      taxiUnternehmen.clickTaxiHinzufuegenButton('taxiHinzufuegen')
      taxiUnternehmen.enterTaxiKennz('FR-DA-44')
      taxiUnternehmen.enterTaxiGroesse('4');
      taxiUnternehmen.enterTaxiLong('9.183333');
      taxiUnternehmen.enterTaxiLat('48.783333')
      taxiUnternehmen.clickOk('.alert-button.ion-focusable.ion-activatable.sc-ion-alert-md');
    });
  }); 

});