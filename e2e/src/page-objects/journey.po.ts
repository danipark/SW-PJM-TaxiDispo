import { lstat } from 'fs';
import { browser, by, element, ExpectedConditions, protractor } from 'protractor';
import { PageObjectBase } from './base.po';

export class JourneyPage extends PageObjectBase {
  constructor() {
    super('app-journey', '/journey');
  }

  getJourneyURL() {
    return browser.getCurrentUrl()
  }

  getJourneyTitle() {
    return element.all(by.css('ion-title')).last().getText();
  }

  getStartpunktInputFeld() {
    return element(by.css('#geocoderstart.geocoderstart'));
  }

  getZielpunktInputFeld() {
    return element(by.className('')).last();
  }

  getDatumInputField() {
    return element(by.css('ion-datetime[formControlName="dateForm"] input'))
  }

  clickMenu() {
    this.clickButton('menuButton')
  }
  autoCompleteSearch(text, index) {
    browser.actions()
    .mouseMove(element(by.css('geocoderziel')))
    .sendKeys(text)
      .perform().then(function () {
        browser.sleep(500);
        // press the down arrow for the autocomplete item we want to choose
        for (var i = 0; i < index; i++) {

          browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
        }
        browser.sleep(500);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
      });
  }
}