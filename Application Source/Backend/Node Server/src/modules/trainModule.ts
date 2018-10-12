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

// tslint:disable-next-line:no-var-requires
const ImageScraper = require('../../external_modules/Image Scraper/dist/index');
import {PythonShell} from 'python-shell';
import { head } from 'shelljs';

export async function trainModule(payload, logger) {
    logger.info('Training Module Starting To Handle Train Request');

    const header = payload.name;
    let ScrapeImages = payload.scrape;
    if (ScrapeImages == null) {ScrapeImages = 'true'; }
    let epochs = payload.epochs;
    if (epochs == null) {epochs = '20'; }
    const categories = payload.categories;

    // --------------------------------------------------
    // Scraping Images
    // --------------------------------------------------

    if (ScrapeImages === 'true') {
        logger.info('Training Module Starting to Scrape Images');
        const IS = new Promise(async (resolve) => {
            const done = ImageScrape(header, categories, logger);
            if (await done) {
               resolve('Training Module Finished Scraping Images');
            }
        });
        const scraper = await IS;
        logger.info(scraper);
    } else {
        logger.info('Training Module Does Not Need to Scrape Images');
        logger.debug('No Images Being Scraped');
    }

    // --------------------------------------------------
    // We now have images for categories
    // in a folder called:
    // <header>_model/<header>_downloaded_images
    // --------------------------------------------------

    // --------------------------------------------------
    // Checking Images
    // --------------------------------------------------
    logger.info('Training Model Starting to Check Images');
    const CI = new Promise(async (resolve) => {
        const done = CheckImages(header, categories, logger);
        if (await done) {
            resolve('Training Model Finished Checking Images');
        }
    });
    const checker = await CI;
    logger.info(checker);

    // --------------------------------------------------
    // Initialise training process
    // --------------------------------------------------

    // --------------------------------------------------
    // Splitting Files
    // --------------------------------------------------
    logger.info('Training Model Starting to Split Files');
    const SF = new Promise(async (resolve) => {
        const done = SplitFiles(header, logger);
        if (await done) {
            resolve('Training Model Finished Splitting Files');
        }
    });
    const splitter = await SF;
    logger.info(splitter);

    // --------------------------------------------------
    // We now have trainig and validation files for
    // categories in a folder called:
    // <header>_model/<header>_dataset/training_data
    // <header>_model/<header>_dataset/validation_data
    // and a file called classes.json with categories
    // --------------------------------------------------

    // --------------------------------------------------
    // Training Model
    // --------------------------------------------------
    logger.info('Training Model Starting to Train Model');
    const TM = new Promise(async (resolve) => {
        const done = TrainModel(header, epochs, logger);
        if (await done) {
            resolve('Training Model Finished Training Model');
        }
    });
    const trainer = await TM;
    logger.info(trainer);

    // --------------------------------------------------
    // We now have a model file saved to a folder called:
    // <header>_model/<header>_dataset/<header>-mobilenet-tf.h5
    // --------------------------------------------------

    // --------------------------------------------------
    // Running test on model accuracy
    // --------------------------------------------------
    // logger.info('Training Model Starting to Test Model');
    // TestModelAccuracy(header, logger);
    // logger.info('Training Model Finished Testing Model');

    logger.info('Training Module Finished Handling Train Request');
}

// --------------------------------------------------
// Image Scrape Function
// --------------------------------------------------
// Description: It runs the JS file found at
// Image Scraper/dist/index.js
// --------------------------------------------------
// Functional Description: Scrape Google Images for
// pictures based on @categories parameter
// --------------------------------------------------
const ImageScrape = async (header, categories, logger) => {
    logger.debug('ImageScraper starting');
    let numCompleted = 0;
    const allLoops = new Promise(async (resolve) => {
        // tslint:disable-next-line:forin
        for (const category in categories) {
            logger.debug('Image scraping for: ' + categories[category]);
            ImageScraper.ImageScraper(header, categories[category]).then(() => {
                    numCompleted++;

                    logger.debug('\n' + numCompleted + ' categories completed out of ' + categories.length + '\n');
                    if (numCompleted === categories.length) {
                        resolve('All loops completed');
                    }
                });
            // resolve("One loop completed");
        }
        logger.debug('THIS SHOULD APPEAR IN THE BEGINNING');
    });
    const allLoopsDone = await allLoops;
    logger.debug(allLoopsDone);
    logger.debug('THIS SHOULD ONLY APPEAR AFTER ALL IMAGES ARE SCRAPED');
    logger.debug('ImageScraper done');
    return true;
};

// --------------------------------------------------
// Check Images Function
// --------------------------------------------------
// Description: Run the python script file found at
// ImageScraper/check_images.py
// --------------------------------------------------
// Functional Description: Go through downloaded
// pictures and delete any that are faulty.
// --------------------------------------------------
const CheckImages = async (header, categories, logger) => {
    logger.debug('check_images starting');
    let numCompleted = 0;
    const checkImages = new Promise(async (resolve) => {
        // tslint:disable-next-line:forin
        for (const category in categories) {
            const imageChecker = './external_modules/Image Scraper/check_images.py';
            const pyChecker = new PythonShell(imageChecker);
            pyChecker.send(categories[category]);
            pyChecker.send(header);
            logger.debug('Checking folder: ' + categories[category]);
            pyChecker.on('message', (message) => {
                if (message.length > 0) {
                    logger.debug('Python Checker: ' + message);
                }
            });
            pyChecker.end((err, code, signal) => {
                if (err) {
                    logger.error('Error: ' + err);
                    throw err;
                }
                logger.debug('Exited with code <' + code + '> and signal ' + signal);
                numCompleted++;
                if (numCompleted === categories.length) {
                    resolve('check_images completed');
                }
                // resolve('Check_images completed');
            });
        }
    });

    const checkedImages = await checkImages;
    logger.debug(checkedImages);
    return true;
};

// --------------------------------------------------
// Split Files Function
// --------------------------------------------------
// Description: Run the python script file found at
// Keras Training Model/split-files.py
// --------------------------------------------------
// Functional Description: Splits files into a
// training file and validation file, and creates a
// JSON file with categories
// --------------------------------------------------
const SplitFiles = async (header, logger) => {
    logger.debug('split_files starting');
    const splitFiles = new Promise(async (resolve) => {
        const fileSplitter = './external_modules/Keras Training Model/split-files.py';
        const pySplitFiles = new PythonShell(fileSplitter);

        pySplitFiles.send(header);
        pySplitFiles.on('message', (message) => {
            if (message.length > 0) {
                logger.debug('Python Splitter: ' + message);
            }
        });
        pySplitFiles.end((err, code, signal) => {
            if (err) {
                logger.error('Error: ' + err);
                throw err;
            }
            logger.debug('Exited with code <' + code + '> and signal ' + signal);
            resolve('split_files completed');
        });
    });
    const filesSplit = await splitFiles;
    logger.debug(filesSplit);
    return true;
};

// --------------------------------------------------
// Train Model Function
// --------------------------------------------------
// Description: Run the python script file found at
// Keras Training Model/fine-tune-mobilenet.py
// --------------------------------------------------
// Functional Description: Create a model based on
// scraped images using @epoch parameter to define
// the number of epochs used.
// --------------------------------------------------
const TrainModel = async (header, epochs, logger) => {
    logger.debug('Fine-tune-mobilenet starting');
    const startTraining = new Promise(async (resolve) => {
        const modelTrainer = './external_modules/Keras Training Model/fine-tune-mobilenet.py';
        const pyTrainer = new PythonShell(modelTrainer);

        pyTrainer.send(header);
        pyTrainer.send('./' + header + '_model\\' + header + '_dataset\\training_data');
        pyTrainer.send('./' + header + '_model\\' + header + '_dataset\\validation_data');
        pyTrainer.send('./' + header + '_model\\' + header + '_dataset\\' + header + '-mobilenet-tf.h5');
        pyTrainer.send(epochs);
        pyTrainer.on('message', (message) => {
            if (message.length > 0) {
                logger.debug('Python Trainer: ' + message);
            }
        });
        pyTrainer.end((err, code, signal) => {
            if (err) {
                logger.error('Error: ' + err);
                throw err;
            }
            logger.debug('Exited with code <' + code + '> and signal ' + signal);
            resolve('Fine-tune-mobilenet completed');
        });
    });

    const trainer = await startTraining;
    logger.debug(trainer);
    return true;
};

// --------------------------------------------------
// Test Model Accuracy Function
// --------------------------------------------------
// Description: Run the python script file found at
// Keras Training Model/test-mobile-acc.py
// --------------------------------------------------
// Functional Description: Run a test of the model
// using pictures found in ./test_images folder
// --------------------------------------------------
const TestModelAccuracy = async (header, logger) => {
    logger.debug('test-mobile-acc starting');
    const testModel = new Promise(async (resolve) => {
        const modelTester = './external_modules/Keras Training Model/test-mobile-acc.py';
        const pyTester = new PythonShell(modelTester);

        pyTester.send('./' + header + '_model/' + header + '_dataset/' + header + '-mobilenet-tf.h5');
        pyTester.send('./test_images');

        pyTester.on('message', (message) => {
            if (message.length > 0) {
                logger.debug('Python Tester: ' + message);
            }
        });
        pyTester.end((err, code, signal) => {
            if (err) {
                logger.error('Error: ' + err);
                throw err;
            }
            logger.debug('Exited with code <' + code + '> and signal ' + signal);
            resolve('test-mobile-acc completed');
        });
    });

    const tester = await testModel;
    logger.debug(tester);
    return true;
};
// module.exports.trainModule = trainModule;
