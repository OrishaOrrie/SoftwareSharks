/* 
    File Name: trainModule.js
    Version Number: 1.0.0
    Author Name: Jonathan Lew
    Project Name: Ninshiki
    Organization: Software Sharks
    Update History:
    Functional Description: This module is here to
        allow for training a model based on user 
        defined categories.
*/
var ImageScraper = require("../../../Image Scraper/index")

var trainModule = function trainModule(categories) {
    console.log("Training Module");
    //console.log(categories);
    
    const header=categories["header"];
    categories=categories["categories"];
    
    //Scrape Images
    for(var category in categories) {
        console.log("Image scraping for: "+categories[category]);
        ImageScraper.ImageScraper(categories[category]);
    }

    //We now have images for categories
    //Initialise training process
    
}

module.exports.trainModule = trainModule;