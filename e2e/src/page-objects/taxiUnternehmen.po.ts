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
}
