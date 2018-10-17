
Feature('About Modal');

Before((I) => {     // Completed before each scenario
    I.amOnPage('/');
    I.click({xpath: '//*[@id="tabpanel-t0-0"]/page-home/ion-header/ion-navbar/ion-buttons/button'});
});

Scenario('opens About Modal upon clicking ? icon', (I) => {
    I.see('Orisha Orrie');
});

Scenario('closes modal', (I) => {
    I.click('Close');
    I.see('Home');
});
