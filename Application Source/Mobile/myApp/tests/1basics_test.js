
Feature('Basic Functionality');

Before((I) => {     // Completed before each scenario
    I.amOnPage('/');
});

Scenario('sees "Home" upon opening app', (I) => {
    I.see('Home');
});

Scenario('can change slides', (I) => {
    I.click({xpath: '//*[@id="tabpanel-t0-0"]/page-home/ion-content/div[2]/ion-slides/div/div[2]/button[2]'});
    I.see('Image Analysis');
});

Scenario('tapping the Predict tab goes to the Image recognition page', (I) => {
    I.click('Predict');
    I.see('Image recognition');
});

Scenario('tapping the Tools tab goes to the Item calculator page', (I) => {
    I.click('Tools');
    I.see('Item calculator');
});

Scenario('tapping the Contact Us tab goes to the Contact Us page', (I) => {
    I.click('Contact Us');
    I.see('Contact Us');
});

Scenario('tapping the Contact Us tab goes to the Contact Us page', (I) => {
    I.click('Contact Us');
    I.see('Contact Us');
});

Scenario('tapping the Question button opens the About modal', (I) => {
    I.click({xpath: '//*[@id="tabpanel-t0-0"]/page-home/ion-header/ion-navbar/ion-buttons/button'});
    I.see('About Us');
});