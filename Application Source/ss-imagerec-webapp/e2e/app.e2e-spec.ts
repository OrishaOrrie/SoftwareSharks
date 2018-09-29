import { AppPage, ImageUploadPage, UtilitiesPage, ContactUsPage } from './app.po';
import { browser, ExpectedConditions } from '../node_modules/protractor';

describe('ss-imagerec-webapp App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title in toolbar', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('[ NINSHIKI ]');
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

  it('should navigate to utilities from navbar', () => {
    page.navigateTo();
    page.getNavbarUtilities().click().then(function() {
      browser.wait(protractor.ExpectedConditions.urlContains('utilities'), 5000).then((result) => {
        expect(result).toBeTruthy();
      });
    });
  });

  it('should navigate to contactus from navbar', () => {
    page.navigateTo();
    page.getNavbarContactus().click().then(function() {
      browser.wait(protractor.ExpectedConditions.urlContains('contactus'), 5000).then((result) => {
        expect(result).toBeTruthy();
      });
    });
  });

  it('should navigate to imageupload from submit button', () => {
    page.navigateTo();
    page.getImageSubmitButton().click().then(function() {
      browser.wait(protractor.ExpectedConditions.urlContains('imageupload'), 5000).then((result) => {
        expect(result).toBeTruthy();
      });
    });
  });

});

describe('ss-imagerec-webapp ImageUpload', () => {
  const path = require('path');
  let page: ImageUploadPage;
  const testImgHammer = './images/hdx-claw-hammers-n-a10shd-64_1000.jpg';
  let absolutePath = null;

  beforeEach(() => {
    page = new ImageUploadPage();
  });

  it('should be on the Image Upload page', () => {
    page.navigateTo();
    browser.wait(protractor.ExpectedConditions.urlContains('imageupload'), 10000).then((result) => {
      expect(result).toBeTruthy();
    });
  });

  it('should display the Upload button if a file is selected', () => {
    page.navigateTo();
    absolutePath = path.resolve(__dirname, testImgHammer);
    // const fileElem = page.getFileInput();
    // browser.executeScript(
    //   'arguments[0].style.visibility = "visible"; arguments[0].style.height = "1px";' +
    //   ' arguments[0].style.width = "1px";  arguments[0].style.opacity = 1',
    //   fileElem.getWebElement()
    // );
    // fileElem.sendKeys(absolutePath);
    // browser.sleep(15000);
    browser.sleep(20000);
    page.getFileInput().sendKeys(absolutePath);
    expect(page.getUploadButton()).toBeTruthy();
  });

  it('should display a list of results after pressing submit', () => {
    page.navigateTo();
    absolutePath = path.resolve(__dirname, testImgHammer);
    page.getFileInput().sendKeys(absolutePath);
    browser.sleep(1000);
    page.getUploadButton().click();
    browser.sleep(1000);
    expect(page.getResultsList()).toBeTruthy();
  });
});

describe('ss-imagerec-webapp Utilities', () => {
  let page: UtilitiesPage;

  beforeEach(() => {
    page = new UtilitiesPage();
  });

  it('should be on the Tools page', () => {
    page.navigateTo();
    browser.wait(protractor.ExpectedConditions.urlContains('utilities'), 10000).then((result) => {
      expect(result).toBeTruthy();
    });
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
    expect(page.getResultText()).toBe('Number of items: 15');
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
    expect(page.getResultText()).toBe('Empty bucket cannot weigh more than a filled bucket');
  });

  it('should display error message if input values are blank', () => {
    browser.sleep(5000);
    page.navigateTo();
    page.getSingleWeight().clear();
    page.getEmptyWeight().clear();
    page.getFilledWeight().clear();
    browser.waitForAngular();
    expect(page.getResultText()).toBe('Weight inputs cannot be empty');
  });
});

describe('ss-imagerec-webapp ContactUs', () => {
  let page: ContactUsPage;

  beforeEach(() => {
    page = new ContactUsPage();
  });

  it('should not display any status message initially', () => {
    page.navigateTo();
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
    expect(page.getStatusResult()).toBeTruthy();
  });
});
