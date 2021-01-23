import { browser, by, element, ExpectedConditions } from 'protractor';
import { PageObjectBase } from './base.po';

export class taxiUnternehmenPage extends PageObjectBase {
  constructor() {
    super('app-taxiUnternehmen', '/taxiUnternehmen');
  }
  clickDashboardButton(sel: string){
    const el = element(by.id(sel));
    browser.wait(ExpectedConditions.elementToBeClickable(el));
    el.click();
  }

  clickTaxiHinzufuegenButton(sel: string){
    const el = element(by.id(sel));
    browser.wait(ExpectedConditions.elementToBeClickable(el));
    el.click();
  }

  enterTaxiKennz(kennz: string) {
    element(by.id('taxiKennz')).sendKeys(kennz)
  }

  enterTaxiGroesse(groesse: string) {
    element(by.id('taxiGroesse')).sendKeys(groesse)
  }

  enterTaxiLong(long: string){
    element(by.id('taxiLongitude')).sendKeys(long)
  }

  enterTaxiLat(lat: string){
    element(by.id('taxiLatitude')).sendKeys(lat)
  }

  clickOk(sel: string){
    const yesButton = element(by.cssContainingText(sel, 'Taxi speichern'));
    browser.wait(ExpectedConditions.elementToBeClickable(yesButton));
    yesButton.click();
  }
}
