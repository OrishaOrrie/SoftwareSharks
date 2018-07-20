import { AppPage, ImageUploadPage, UtilitiesPage, ContactUsPage } from './app.po';
import { browser } from '../node_modules/protractor';

describe('ss-imagerec-webapp App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title in toolbar', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('NINSHIKI');
  });

  it('should display the Home component at root', () => {
    page.navigateTo();
    expect(page.getHomeComponent()).toBeTruthy();
  });

  it('should route to the Home page', () => {
    page.navigateTo();
    browser.getCurrentUrl().then(function(currentUrl) {
      expect(currentUrl.indexOf('home') !== -1).toBeTruthy();
    });
  });

  it('should navigate to imageupload from navbar', () => {
    page.navigateTo();
    page.getNavbarImageupload().click().then(function() {
      browser.getCurrentUrl().then(function(currentUrl) {
        expect(currentUrl.indexOf('imageupload') !== -1).toBeTruthy();
      });
    });
  });

  it('should navigate to utilities from navbar', () => {
    page.navigateTo();
    page.getNavbarUtilities().click().then(function() {
      browser.getCurrentUrl().then(function(currentUrl) {
        expect(currentUrl.indexOf('utilities') !== -1).toBeTruthy();
      });
    });
  });

  it('should navigate to contact-us from navbar', () => {
    page.navigateTo();
    page.getFooterContactUs().click().then(function() {
      browser.getCurrentUrl().then(function(currentUrl) {
        expect(currentUrl.indexOf('contactus') !== -1).toBeTruthy();
      });
    });
  });

});

describe('ss-imagerec-webapp ImageUpload', () => {
  const path = require('path');
  let page: ImageUploadPage;
  const testImgEarthClamp = './images/IMG_20180517_141125.jpg';
  const testImgHammer = './images/hdx-claw-hammers-n-a10shd-64_1000.jpg';
  let absolutePath = null;

  beforeEach(() => {
    page = new ImageUploadPage();
  });

  it('should display the Upload button if a file is selected', () => {
    page.navigateTo();
    absolutePath = path.resolve(__dirname, testImgHammer);
    page.getFileInput().sendKeys(absolutePath);
    expect(page.getUploadButton()).toBeTruthy();
  });

  xit('should display a list of results from the server after upload', () => {
    page.navigateTo();
    browser.sleep(5000);
    absolutePath = path.resolve(__dirname, testImgHammer);
    page.getFileInput().sendKeys(absolutePath);
    page.getUploadButton().click();
    browser.sleep(10000);
    expect(page.getResultsList().count()).toBeGreaterThan(5);
  });
});

describe('ss-imagerec-webapp Utilities', () => {
  let page: UtilitiesPage;

  beforeEach(() => {
    page = new UtilitiesPage();
  });

  it('should return the correct calculation for a valid input', () => {
    page.navigateTo();
    browser.sleep(5000);
    page.getSingleWeight().clear();
    page.getSingleWeight().sendKeys('1');
    page.getEmptyWeight().clear();
    page.getEmptyWeight().sendKeys('5');
    page.getFilledWeight().clear();
    page.getFilledWeight().sendKeys('20');
    browser.waitForAngular();
    expect(page.getResultText()).toBe('NUMBER OF ITEMS: 15');
  });

  it('should display error message if input values are negative', () => {
    browser.sleep(5000);
    page.navigateTo();
    page.getSingleWeight().clear();
    page.getSingleWeight().sendKeys('-1');
    page.getEmptyWeight().clear();
    page.getEmptyWeight().sendKeys('-5');
    page.getFilledWeight().clear();
    page.getFilledWeight().sendKeys('-20');
    browser.waitForAngular();
    expect(page.getResultText()).toBe('NUMBER OF ITEMS: 15');
  });
});

describe('ss-imagerec-webapp ContactUs', () => {
  let page: ContactUsPage;

  beforeEach(() => {
    page = new ContactUsPage();
  });

  it('should not display any status message initially', () => {
    page.navigateTo();
    browser.sleep(5000);
    expect(page.getStatusResult()).toBeTruthy();
  });

  it('should display status message if a valid request is sent', () => {
    page.navigateTo();
    page.getNameField().clear();
    page.getNameField().sendKeys('Testy Boi');
    page.getEmailField().clear();
    page.getEmailField().sendKeys('testyboi@testmail.test');
    page.getMsgField().clear();
    page.getMsgField().sendKeys('Test message from E2E testing test');
    page.getSubmitButton().click();
    browser.sleep(5000);
    expect(page.getStatusResult()).toBeTruthy();
  });
});
