import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root .toolbar__title')).getText();
  }

  getHomeComponent() {
    return element(by.css('app-home'));
  }

  getNavbarContactus() {
    return element(by.id('navbar-contact'));
  }

  getNavbarUtilities() {
    return element(by.id('navbar-utilities'));
  }

  getImageSubmitButton() {
    return element(by.id('submit-button'));
  }

}

export class ImageUploadPage {
  navigateTo() {
    return browser.get('/#/imageupload');
  }

  getFileInput() {
    return element(by.css('input[type="file"]'));
  }

  getUploadButton() {
    return element(by.className('upload-card__upload-button'));
  }

  getResultsList() {
    return element.all(by.className('result-card__results-list'));
  }

}

export class UtilitiesPage {
  navigateTo() {
    return browser.get('/#/utilities');
  }

  getResultText() {
    return element(by.className('tally-upper-card__result-title')).getText();
  }

  getSingleWeight() {
    return element(by.id('single-weight'));
  }

  getEmptyWeight() {
    return element(by.id('empty-bucket'));
  }

  getFilledWeight() {
    return element(by.id('filled-bucket'));
  }
}

export class ContactUsPage {
  navigateTo() {
    return browser.get('/#/contactus');
  }

  getNameField() {
    return element(by.className('email__name-part'));
  }

  getEmailField() {
    return element(by.className('email__email-part'));
  }

  getMsgField() {
    return element(by.id('message'));
  }

  getSubmitButton() {
    return element(by.className('email__submit'));
  }

  getStatusResult() {
    return element(by.className('status-heading'));
  }
}
