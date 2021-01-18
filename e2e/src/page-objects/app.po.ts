import { browser, by, element } from 'protractor';
import { PageObjectBase } from './base.po';

export class AppPage extends PageObjectBase {
    constructor() {
        super('app', '/')
    }
    navigateTo() {
        return browser.get('/');
    }

    getPageTitle() {
        return element(by.css('ion-title')).getText();
    }
}