const puppeteer = require('puppeteer');
const fs = require('fs');
const http = require('http');
const https = require('https');
const spawn = require('child_process').spawn;

let headlessMode = true;

if (process.argv[3]) {
  headlessMode = process.argv[3];
}
var ImageScraper = function ImageScraper(searchTerm) {
  return new Promise((resolve, reject) => {
    (async () => {
      const browser = await puppeteer.launch({
        headless: headlessMode
      });
  
      //const searchTerm = process.argv[2];
      const dirTerm = searchTerm.replace(/ /g, '_');
  
      // Go to Google Images
      console.log('Don\'t mind me just popping in to Google Images');
      const page = await browser.newPage();
      await page.goto("https://images.google.com");
  
      // Input the search term and hit Enter
      console.log('Hello can I get uhhhh some ' + searchTerm);
      await page.type('#lst-ib', searchTerm);
      await page.keyboard.press('Enter');
      await page.waitForSelector('#hdtb-msb-vis');
  
      await page.addScriptTag({url: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js'});
  
      // Scroll to the bottom of the page
      console.log('Now I am scrolling to the bottom of the page... this may take a while');
      await page.evaluate(async() => {
        await new Promise((resolve, reject) => {
          let totalHeight = 0;
          let distance = 100;
          let timer = setInterval(() => {
            let scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      }).then(() => {
        console.log('Reached end of page');
      });
  
      let numImages = 0;
      numImages = await page.evaluate(() => {
        return document.querySelectorAll('.rg_di').length;
      });
  
      console.log(numImages + ' images found');
  
      // Get the image source urls of all the images found and add them to an array
      let urls = [];
      for (let i = 0; i < numImages; i++) {
        urls.push( await page.evaluate((i) => {
          let index = '[data-ri=\"' + i + '\"]';
          let metaText = document.querySelector(index).childNodes[2].innerHTML;
          return JSON.parse(metaText).ou;
        }, i));
      }
  
      // get all the images at the urls
      console.log('getting image download URLs');
      let numDown = 0;
  
      let looper = new Promise((resolve) => {
        setTimeout(() => {
          for (let i = 0; i < urls.length; i++) {
            // console.log(urls[i]);
            let j = 0;
  
            let dir = 'downloaded_images/' + dirTerm + '/';
            if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
            }
      
            const fileName = dir + i + '.jpg';
            let file = fs.createWriteStream(fileName);
            let protocol = http;
            if (urls[i].slice(0,5) == 'https') {
              protocol = https;
            } else {
              protocol = http;
            }
  
            let request = protocol.get(urls[i], function(response) {
              response.pipe(file);
              file.on('finish', function(cb) {
                file.close(cb);
                console.log(i + ': ' + urls[i]);
                numDown++;
                console.log(numDown + ' images downloaded');

                /**
                 * If the number of images processed is within 50 of the total images identified, then resolve this promise
                 */
                if (numDown > numImages - 50) {
                  resolve('\nYEEEEEEEET\n');
                  clearTimeout(); // doesn't work
                  return; // doesn't work
                }
                if (cb) cb(err.message);
              });
            }).on('error', function(err, cb) {
              fs.unlinkSync(fileName);
              numDown++;
              console.log(i + ' was deleted');
              console.log(numDown + ' images completed');
              // if (cb) cb(err.message);
            });
    
          };
        }, 30000);
      });
  
      await browser.close();

      let result = await looper;
      console.log(result);
      resolve();
      console.log("Finished Scraping for "+dirTerm);
    })();
  });  
  
}
//ImageScraper("Angry");
module.exports.ImageScraper = ImageScraper;