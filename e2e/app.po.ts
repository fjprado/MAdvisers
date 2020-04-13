import { browser, element, by } from 'protractor';

export class CimpPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cimp-root h1')).getText();
  }
}
