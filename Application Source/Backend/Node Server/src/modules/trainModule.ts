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
import { head } from 'shelljs';

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
            // ImageScraper.ImageScraper(categories[category]).then(() => {
            //     numCompleted++;

            //     console.log('\n' + numCompleted + ' categories completed out of ' + categories.length + '\n');
            //     if (numCompleted === categories.length) {
            //         resolve('All loops completed');
            //     }
            // });
            resolve("One loop completed");
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

    //Check Images
    numCompleted = 0;
    const checkImages = new Promise(async (resolve) => {
        for (const category in categories) {
            var imageChecker = './external_modules/Image Scraper/check_images.py';
            let pyChecker = new PythonShell(imageChecker);
            pyChecker.send(categories[category]);
            console.log("Checking folder: " + categories[category]);
            pyChecker.on('message', function (message) {
                console.log('Python Checker: ' + message);
            });
            pyChecker.end(function (err, code, signal) {
                if (err) {
                    throw err;
                };
                console.log('The exit code was: ' + code);
                console.log('The exit signal was: ' + signal);
                console.log("Finish");
                numCompleted++;
                if (numCompleted === categories.length) {
                    resolve('Check_images completed');
                }
                // resolve('Check_images completed');
            });
        }
    });

    const checkedImages = await checkImages;
    console.log(checkedImages);

    //Split Files
    console.log("Splitting Files");
    const splitFiles = new Promise(async (resolve) => {
        var fileSplitter = './external_modules/Keras Training Model/split-files.py';
        let pySplitFiles = new PythonShell(fileSplitter);

        pySplitFiles.send(header);
        pySplitFiles.on('message', function (message) {
            console.log('Python Splitter: ' + message);
        });
        pySplitFiles.end(function (err, code, signal) {
            if (err) {
                throw err;
            };
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log("Finish");
            resolve("Split_files completed");
        });
    });
    const filesSplit = await splitFiles;
    console.log(filesSplit);

    //Train Model
    console.log("Training Model Now");
    const startTraining = new Promise(async (resolve) => {
        var modelTrainer = './external_modules/Keras Training Model/fine-tune-mobilenet.py';
        let pyTrainer = new PythonShell(modelTrainer);

        pyTrainer.send("./"+header+"_dataset/training_data");
        pyTrainer.send("./"+header+"_dataset/validation_data");
        pyTrainer.send("./"+header+"_dataset/"+header+"-mobilenet-tf.h5");
        // --------------------------------------------------
        // Todo: Change line below to reflect number of
        //          Epochs to be used in training model.
        // --------------------------------------------------
        
        pyTrainer.send("1");
        pyTrainer.on('message',function(message) {
            console.log("Python Trainer: "+message)
        });
        pyTrainer.end(function(err,code,signal){
            if(err){
                throw err;
            }
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log("Finish");
            resolve("Fine-tune-mobilenet completed");
        });
    });

    const trainer = await startTraining;
    console.log(trainer);

}

// module.exports.trainModule = trainModule;
