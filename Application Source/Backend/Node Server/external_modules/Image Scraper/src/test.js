"use strict";
exports.__esModule = true;
var fs = require("fs");
var http = require("http");
var https = require("https");
var puppeteer = require("puppeteer");
function Test(searchTerm) {
    var localPage;
    var localBrowser;
    var urls = [];
    var dirTerm = searchTerm.replace(/ /g, '_');
    var dir = 'downloaded_images/' + dirTerm + '/';
    return puppeteer.launch({
        headless: true
    }).then(function (browser) {
        localBrowser = browser;
        return browser.newPage();
    }).then(function (page) {
        localPage = page;
        return page.goto('https://images.google.com');
    }).then(function () {
        // Search term
        return localPage.type('#lst-ib', searchTerm);
    }).then(function () {
        // Hit <Enter>
        return localPage.keyboard.press('Enter');
    }).then(function () {
        return localPage.waitForSelector('#hdtb-msb-vis');
    }).then(function () {
        return localPage.addScriptTag({ url: 'https://code.jquery.com/jquery-3.3.1.min.js' });
    }).then(function () {
        // Scroll to the bottom of the page
        console.log('Now I am scrolling to the bottom of the page... this may take a while');
        return localPage.evaluate(function () {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(function () {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                }
            }, 100);
        });
    }).then(function () {
        console.log('Reached end of page');
        return localPage.evaluate(function () {
            return document.querySelectorAll('.rg_di').length;
        });
    }).then(function (numImages) {
        console.log(numImages + ' images found');
        // Get the image source urls of all the images found and add them to an array
        for (var i = 0; i < numImages; ++i) {
            localPage.evaluate(function (j) {
                var index = '[data-ri=\"' + j + '\"]';
                var metaText = document.querySelector(index).childNodes[2].innerHTML;
                return JSON.parse(metaText).ou;
            }, i).then(function (result) {
                urls.push(result);
            });
        }
    }).then(function () {
        return localBrowser.close();
    }).then(function () {
        return setTimeout(function () {
            console.log('getting image download URLs');
            var numDown = 0;
            var _loop_1 = function (i) {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                var fileName = dir + i + '.jpg';
                var file = fs.createWriteStream(fileName);
                var protocol = void 0;
                if (urls[i].slice(0, 5) === 'https') {
                    protocol = https;
                }
                else {
                    protocol = http;
                }
                protocol.get(urls[i], function (response) {
                    response.pipe(file);
                    file.on('finish', function (cb) {
                        file.close();
                        console.log(i + ': ' + urls[i]);
                        numDown++;
                        console.log(numDown + ' images downloaded');
                    });
                }).on('error', function (err, cb) {
                    fs.unlinkSync(fileName);
                    numDown++;
                    console.log(i + ' was deleted');
                    console.log(numDown + ' images completed');
                });
            };
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < urls.length; ++i) {
                _loop_1(i);
            }
        }, 30000);
    }).then(function (result) {
        console.log(result);
        console.log('Finished Scraping for ' + dirTerm);
    })["catch"](function (error) {
        console.log('Something Broke: ' + error);
    });
}
exports.Test = Test;
