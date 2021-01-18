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
    browser.get('http://localhost:4200/TaxiDispo/journey');
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