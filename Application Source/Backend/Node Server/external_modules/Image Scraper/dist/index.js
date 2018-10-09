let fs = require('fs');
let http = require('http');
let https = require('https');
let puppeteer = require('puppeteer');
// const spawn = require("child_process").spawn;

let headlessMode;

if (process.argv[3]) {
  headlessMode = process.argv[3];
} else {
  headlessMode = true;
}

ImageScraper = function (category,searchTerm) {
  return new Promise((resolve, reject) => {
    (async () => {
      const browser = await puppeteer.launch({
        headless: headlessMode,
      });

      // const searchTerm = process.argv[2];
      const dirTerm = searchTerm.replace(/ /g, '_');

      // Go to Google Images
      console.log("Don't mind me just popping in to Google Images");
      const page = await browser.newPage();
      await page.goto('https://images.google.com');

      // Input the search term and hit Enter
      console.log('Hello can I get uhhhh some ' + searchTerm);
      await page.type('#lst-ib', searchTerm);
      await page.keyboard.press('Enter');
      await page.waitForSelector('#hdtb-msb-vis');

      await page.addScriptTag({url: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js'});

      // Scroll to the bottom of the page
      console.log('Now I am scrolling to the bottom of the page... this may take a while');
      await page.evaluate(async () => {
        // tslint:disable-next-line:no-shadowed-variable
        await new Promise((resolve, reject) => {
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
      }).then(() => {
        console.log('Reached end of page');
      });

      let numImages = 0;
      numImages = await page.evaluate(() => {
        return document.querySelectorAll('.rg_di').length;
      });

      console.log(numImages + ' images found');

      // Get the image source urls of all the images found and add them to an array
      const urls = [];
      for (let i = 0; i < numImages; i++) {
        // tslint:disable-next-line:no-shadowed-variable
        urls.push( await page.evaluate((i) => {
          const index = '[data-ri=\"' + i + '\"]';
          const metaText = (document.querySelector(index).childNodes[2]).innerHTML;
          return JSON.parse(metaText).ou;
        }, i));
      }

      // get all the images at the urls
      console.log('getting image download URLs');
      let numDown = 0;

      // tslint:disable-next-line:no-shadowed-variable
      const looper = new Promise((resolve) => {
        setTimeout(() => {
          for (let i = 0; i < urls.length; i++) {
            // console.log(urls[i]);
            const j = 0;

            const dir = category+"_model/"+category+'_downloaded_images/' + dirTerm + '/';
            if(!fs.existsSync(category+"_model/")){
              fs.mkdirSync(category+"_model/");
            }
            if (!fs.existsSync(category+"_model/"+category+'_downloaded_images/')) {
              fs.mkdirSync(category+"_model/"+category+'_downloaded_images/');
            }
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }

            const fileName = dir + i + '.jpg';
            const file = fs.createWriteStream(fileName);
            let protocol; // = http | https;
            if (urls[i].slice(0, 5) === 'https') {
              protocol = https;
            } else {
              protocol = http;
            }

            const request = protocol.get(urls[i], (response) => {
              response.pipe(file);
              file.on('finish', (cb) => {
                file.close();
                // console.log(i + ': ' + urls[i]);
                numDown++;
                // --------------------------------------------------
                // Todo: COMMENT WHEN IN PROD
                // --------------------------------------------------
                            
                if(numDown <= numImages-100) {//-250 to speed up
                  //console.log(i + ': ' + urls[i]);
                  console.log(numDown + ' images of '+dirTerm+' downloaded');
                }
                // --------------------------------------------------
                /**
                 * If the number of images processed is within 50 of the total images identified,
                 * then resolve this promise
                 */
                if (numDown > numImages-100) {//-250 to speed up
                  //fs.unlinkSync(fileName);
                  //console.log("Unlinking");
                  resolve('\nYEEEEEEEET\n');
                  clearTimeout(); // doesn't work
                  return; // doesn't work
                }
                // if (cb) { cb(err.message); }
              });
            }).on('error', (err, cb) => {
              fs.unlinkSync(fileName);
              file.close();
              numDown++;
              // --------------------------------------------------
              // Todo: COMMENT WHEN IN PROD
              // --------------------------------------------------
                            
              if(numDown <= numImages-1000) {//-250 to speed up
                console.log(i + ' of '+dirTerm+' was deleted');
                console.log(numDown + ' images of '+dirTerm+' completed');
              }
              // --------------------------------------------------
              
              // if (cb) cb(err.message);
            });

          }
        }, 30000);
      });

      await browser.close();

      const result = await looper;
      console.log(result);
      resolve();
      console.log('Finished Scraping for ' + dirTerm);
    })();
  });

}

module.exports = { ImageScraper }