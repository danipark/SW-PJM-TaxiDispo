import { lstat } from 'fs';
import { browser, by, element, ExpectedConditions } from 'protractor';
import { PageObjectBase } from './base.po';

export class JourneyPage extends PageObjectBase {
  constructor() {
    super('app-journey', '/journey');
  }

  getJourneyURL(){
    return browser.getCurrentUrl()
  }

  getJourneyTitle(){
      return element(by.css('ion-title')).last().getText();

  }
}