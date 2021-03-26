import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/home');
  }

  getAvatar(): ElementFinder {
    return element(by.css('ion-avatar'));
  }

  getReminderToogle(): ElementFinder {
    return element(by.css('login__toogle'));
  }

  getIconPerson(): ElementFinder {
    return element(by.css('ion-icon[name="person-outline"]'));
  }

  getIconLock(): ElementFinder {
    return element(by.css('ion-icon[name="lock-closed-outline"]'));
  }

  geButtonSubmit() {
    return element(by.css('button'));
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }

  getInputEmail(): ElementFinder {
    return element(by.css('input[type="email"]'));
  }

  getInputPass(): ElementFinder {
    return element(by.css('input[type="password"]'));
  }

  getErrorElements(): ElementArrayFinder {
    return element.all(by.css('.login__error'));
  }
}
