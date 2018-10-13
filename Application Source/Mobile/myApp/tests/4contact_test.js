
Feature('Contact Us Page');

Before((I) => {     // Completed before each scenario
    I.amAcceptingPopups();
    I.amOnPage('/');
    I.click('Contact Us');
});

Scenario('opens on Tools page', (I) => {
    I.see('Issues? Quote? Contact us!');
});

Scenario('should handle valid form input', (I) => {
    // pause();
    I.fillField({xpath: '//*[@id="name"]/input'}, 'Tobias');
    I.fillField({xpath: '//*[@id="email"]/input'}, 'tbester23@gmail.com');
    I.fillField({xpath: '//*[@id="message"]/textarea'}, 'CodeceptJS testing');
    // I.acceptPopup();
    // pause();
    I.click('Send');
    I.see('Message sent!');
});

Scenario('should reject invalid form input', (I) => {
    I.fillField({xpath: '//*[@id="name"]/input'}, 'Tobias');
    I.fillField({xpath: '//*[@id="email"]/input'}, 'tbester23');
    I.fillField({xpath: '//*[@id="message"]/textarea'}, 'CodeceptJS testing');
    I.click('Send');
    I.dontSee('Message sent!');
});