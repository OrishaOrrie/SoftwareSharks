"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const http = require("http");
const https = require("https");
const puppeteer = require("puppeteer");
let headlessMode;
if (process.argv[3]) {
    headlessMode = process.argv[3];
}
else {
    headlessMode = true;
}
function ImageScraper(searchTerm) {
    return new Promise((resolve, reject) => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({
                headless: headlessMode,
            });
            const dirTerm = searchTerm.replace(/ /g, '_');
            console.log("Don't mind me just popping in to Google Images");
            const page = yield browser.newPage();
            yield page.goto('https://images.google.com');
            console.log('Hello can I get uhhhh some ' + searchTerm);
            yield page.type('#lst-ib', searchTerm);
            yield page.keyboard.press('Enter');
            yield page.waitForSelector('#hdtb-msb-vis');
            yield page.addScriptTag({ url: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js' });
            console.log('Now I am scrolling to the bottom of the page... this may take a while');
            yield page.evaluate(() => __awaiter(this, void 0, void 0, function* () {
                yield new Promise((resolve, reject) => {
                    let totalHeight = 0;
                    const distance = 100;
                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;
                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            })).then(() => {
                console.log('Reached end of page');
            });
            let numImages = 0;
            numImages = yield page.evaluate(() => {
                return document.querySelectorAll('.rg_di').length;
            });
            console.log(numImages + ' images found');
            const urls = [];
            for (let i = 0; i < numImages; i++) {
                urls.push(yield page.evaluate((i) => {
                    const index = '[data-ri=\"' + i + '\"]';
                    const metaText = document.querySelector(index).childNodes[2].innerHTML;
                    return JSON.parse(metaText).ou;
                }, i));
            }
            console.log('getting image download URLs');
            let numDown = 0;
            const looper = new Promise((resolve) => {
                setTimeout(() => {
                    for (let i = 0; i < urls.length; i++) {
                        const j = 0;
                        const dir = 'downloaded_images/' + dirTerm + '/';
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        const fileName = dir + i + '.jpg';
                        const file = fs.createWriteStream(fileName);
                        let protocol;
                        if (urls[i].slice(0, 5) === 'https') {
                            protocol = https;
                        }
                        else {
                            protocol = http;
                        }
                        const request = protocol.get(urls[i], (response) => {
                            response.pipe(file);
                            file.on('finish', (cb) => {
                                file.close();
                                console.log(i + ': ' + urls[i]);
                                numDown++;
                                console.log(numDown + ' images downloaded');
                                if (numDown > numImages - 50) {
                                    resolve('\nYEEEEEEEET\n');
                                    clearTimeout();
                                    return;
                                }
                            });
                        }).on('error', (err, cb) => {
                            fs.unlinkSync(fileName);
                            numDown++;
                            console.log(i + ' was deleted');
                            console.log(numDown + ' images completed');
                        });
                    }
                }, 30000);
            });
            yield browser.close();
            const result = yield looper;
            console.log(result);
            resolve();
            console.log('Finished Scraping for ' + dirTerm);
        }))();
    });
}
exports.ImageScraper = ImageScraper;
