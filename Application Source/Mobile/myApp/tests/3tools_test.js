
Feature('Tools Page');

Before((I) => {     // Completed before each scenario
    I.amOnPage('/');
    I.click('Tools');
});

Scenario('opens on Tools page', (I) => {
    I.see('Calculate total items');
    I.see('Total items: 8');
});

Scenario('displays correct output for valid input', (I) => {
    I.fillField({xpath: '//*[@id="filled"]/input'}, '0');
    I.see('Total items: 98');
});

Scenario('invalidates inputs larger than filled weight', (I) => {
    I.fillField({xpath: '//*[@id="single"]/input'}, '1');
    I.see('Single item cannot weigh more than a filled bucket');
});

Scenario('invalidates inputs that include negative numbers', (I) => {
    I.fillField({xpath: '//*[@id="single"]/input'}, '-1');
    I.see('Weight inputs cannot be empty');
});
