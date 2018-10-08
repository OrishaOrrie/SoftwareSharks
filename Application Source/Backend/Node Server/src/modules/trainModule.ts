// /*
//     File Name: trainModule.ts
//     Version Number: 1.0.0
//     Author Name: Jonathan Lew
//     Project Name: Ninshiki
//     Organization: Software Sharks
//     Update History:
//     Functional Description: This module is here to
//         allow for training a model based on user
//         defined categories.
// */

let ImageScraper = require("../../external_modules/Image Scraper/dist/index");
// let PythonShell = require('python-shell');
import {PythonShell} from 'python-shell';

export async function trainModule(categories) {
// let trainModule = async function trainModule(categories) {
    console.log('Training Module');
    console.log(categories);

    const header = categories.header;
    categories = categories.categories;

    // Scrape Images all categories simultaneously
    // let numCompleted = 0;
    // for(var category in categories) {
    //     console.log("Image scraping for: "+categories[category]);
    //     ImageScraper.ImageScraper(categories[category]).then(() => {
    //         console.log(++numCompleted + ' categories completed out of '+ categories.length);
    //     });
    // };
    let numCompleted = 0;
    const allLoops = new Promise(async (resolve) => {
        for (const category in categories) {
            console.log('Image scraping for: ' + categories[category]);
            ImageScraper.ImageScraper(categories[category]).then(() => {
                numCompleted++;

                var imageChecker='./external_modules/Image Scraper/check_images.py';
                let pyChecker = new PythonShell(imageChecker);
                pyChecker.send(categories[category]);
                console.log("Checking folder: "+categories[category]);
                pyChecker.on('message',function(message){
                    console.log('Python Checker: '+message);
                });
                pyChecker.end(function(err,code,signal) {
                    if(err){
                        throw err;
                    };
                    console.log('The exit code was: '+code);
                    console.log('The exit signal was: '+signal);
                    console.log("Finish");
                });

                console.log('\n' + numCompleted + ' categories completed out of ' + categories.length + '\n');
                if (numCompleted === categories.length) {
                    resolve('All loops completed');
                }
            });
            // resolve("One loop completed");
        }
        console.log('THIS SHOULD APPEAR IN THE BEGINNING');
    });

    // Scrape Images one by one category
    // let numCompleted = 0;
    // let allLoops = new Promise(async (resolve) => {
    //     for(var category in categories) {
    //         console.log("Image scraping for: "+categories[category]);
    //         await ImageScraper.ImageScraper(categories[category]);
    //         console.log('\n'+ ++numCompleted + ' categories completed out of '+ categories.length + '\n');
    //         // resolve("One loop completed");
    //     };
    //     console.log('THIS SHOULD ONLY APPEAR AFTER ENTIRE LOOP IS DONE');
    //     resolve("All loops completed");
    // });

    const allLoopsDone = await allLoops;
    console.log(allLoopsDone);

    // We now have images for categories
    // Initialise training process
    console.log('THIS SHOULD ONLY APPEAR AFTER ALL IMAGES ARE SCRAPED');

    //Run the python image checker
    // var imageChecker='./external_modules/Image Scraper/check_images.py';
    // let pyChecker = new PythonShell(imageChecker);
    // pyChecker.send
    // pyChecker.on('message',function(message){
    //     console.log('Python: '+message);
    // });
    // pyChecker.end(function(err,code,signal) {
    //     if(err){
    //         throw err;
    //     };
    //     console.log('The exit code was: '+code);
    //     console.log('The exit signal was: '+signal);
    //     console.log("Finish");
    // });

    //Split Files
    // var myScript='./external_modules/Keras Training Model/split-files.py';
    // let pyshell = new PythonShell(myScript);

    // pyshell.on('message',function(message){
    //     console.log('Python: '+message);
    // });
    // pyshell.end(function(err,code,signal) {
    //     if(err){
    //         throw err;
    //     };
    //     console.log('The exit code was: '+code);
    //     console.log('The exit signal was: '+signal);
    //     console.log("Finish");
    // });


}

// module.exports.trainModule = trainModule;
