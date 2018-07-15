import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root .toolbar-title')).getText();
  }

  getHomeComponent() {
    return element(by.css('app-home'));
  }

  getNavbarImageupload() {
    return element(by.id('navbar-image'));
  }

  getNavbarUtilities() {
    return element(by.id('navbar-utilities'));
  }

  getFooterContactUs() {
    return element(by.id('footer-contactus'));
  }

}

export class ImageUploadPage {
  navigateTo() {
    return browser.get('/imageupload');
  }

  getFileInput() {
    return element(by.id('file-upload'));
  }

  getUploadButton() {
    return element(by.className('upload-button'));
  }

  getResultsList() {
    return element.all(by.className('results-list'));
  }

}

export class UtilitiesPage {
  navigateTo() {
    return browser.get('/utilities');
  }

  getResultText() {
    return element(by.className('result-title')).getText();
  }

  getSingleWeight() {
    return element(by.id('single-weight'));
  }

  getEmptyWeight() {
    return element(by.id('empty-weight'));
  }

  getFilledWeight() {
    return element(by.id('filled-weight'));
  }
}

export class ContactUsPage {
  navigateTo() {
    return browser.get('/contactus');
  }

  getNameField() {
    return element(by.className('name-part'));
  }

  getEmailField() {
    return element(by.className('email-part'));
  }

  getMsgField() {
    return element(by.id('message'));
  }

  getSubmitButton() {
    return element(by.className('sumbit-btn'));
  }

  getStatusResult() {
    return element(by.className('status-heading'));
  }
}
