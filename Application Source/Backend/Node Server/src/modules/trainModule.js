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

var trainModule = function trainModule(category) {
    ImageScraper.ImageScraper(category);
}

module.exports.trainModule = trainModule;