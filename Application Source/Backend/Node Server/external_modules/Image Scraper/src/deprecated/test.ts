import fs = require('fs');
import http = require('http');
import https = require('https');
import puppeteer = require('puppeteer');

export function Test(searchTerm) {
    let localPage: puppeteer.Page;
    let localBrowser: puppeteer.Browser;
    const urls = [];
    const dirTerm = searchTerm.replace(/ /g, '_');
    const dir = 'downloaded_images/' + dirTerm + '/';
    return puppeteer.launch({
        headless: true,
    }).then((browser) => {
        localBrowser = browser;
        return browser.newPage();
    }).then((page) => {
        localPage = page;
        return page.goto('https://images.google.com');
    }).then(() => {
        // Search term
        return localPage.type('#lst-ib', searchTerm);
    }).then(() => {
        // Hit <Enter>
        return localPage.keyboard.press('Enter');
    }).then(() => {
        return localPage.waitForSelector('#hdtb-msb-vis');
    }).then(() => {
        return localPage.addScriptTag({ url: 'https://code.jquery.com/jquery-3.3.1.min.js' });
    }).then(() => {
        // Scroll to the bottom of the page
        console.log('Now I am scrolling to the bottom of the page... this may take a while');
        return localPage.evaluate(() => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                }
            }, 100);
        });
    }).then(() => {
        console.log('Reached end of page');
        return localPage.evaluate(() => {
            return document.querySelectorAll('.rg_di').length;
        });
    }).then((numImages) => {
        console.log(numImages + ' images found');
        // Get the image source urls of all the images found and add them to an array
        for (let i = 0; i < numImages; ++i) {
            localPage.evaluate((j) => {
                const index = '[data-ri=\"' + j + '\"]';
                const metaText = (document.querySelector(index).childNodes[2] as HTMLElement).innerHTML;
                return JSON.parse(metaText).ou;
            }, i).then((result) => {
                urls.push(result);
            });
        }
    }).then(() => {
        return localBrowser.close();
    }).then(() => {
        return setTimeout(() => {
            console.log('getting image download URLs');
            let numDown = 0;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < urls.length; ++i) {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }

                const fileName = dir + i + '.jpg';
                const file = fs.createWriteStream(fileName);
                let protocol;
                if (urls[i].slice(0, 5) === 'https') {
                    protocol = https;
                } else {
                    protocol = http;
                }

                protocol.get(urls[i], (response) => {
                    response.pipe(file);
                    file.on('finish', (cb) => {
                        file.close();
                        console.log(i + ': ' + urls[i]);
                        numDown++;
                        console.log(numDown + ' images downloaded');
                    });
                }).on('error', (err, cb) => {
                    fs.unlinkSync(fileName);
                    numDown++;
                    console.log(i + ' was deleted');
                    console.log(numDown + ' images completed');
                });
            }
        }, 30000);
    }).then((result) => {
        console.log(result);
        console.log('Finished Scraping for ' + dirTerm);
    }).catch((error) => {
        console.log('Something Broke: ' + error);
    });
}
