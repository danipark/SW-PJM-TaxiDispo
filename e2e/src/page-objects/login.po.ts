import { browser, by, element, ExpectedConditions } from 'protractor';
import { PageObjectBase } from './base.po';

export class LoginPage extends PageObjectBase {
  constructor() {
    super('app-login', '/login');
  }

  waitForError() {
    browser.wait(
      ExpectedConditions.presenceOf(element(by.className('alert-wrapper sc-ion-alert-md'))),
      3000
    );
  }

  getErrorMessage() {
    return element(by.className('alert-message sc-ion-alert-md')).getText();
  }

  enterEMail(email: string) {
    element(by.css('ion-input[formControlName="email"] input')).sendKeys(email)
  }

  enterPassword(password: string) {
    element(by.css('ion-input[formControlName="password"] input')).sendKeys(password)
  }

  clickSignIn() {
    this.clickButton('submitButton');
  }
}
