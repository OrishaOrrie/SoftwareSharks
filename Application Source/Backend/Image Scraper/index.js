const puppeteer = require('puppeteer');
const fs = require('fs');
const http = require('http');
const https = require('https');
const spawn = require('child_process').spawn;


(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const searchTerm = process.argv[2];
  const dirTerm = searchTerm.replace(' ', '_');

  // Go to Google Images
  console.log('Don\'t mind me just popping in to Google Images');
  const page = await browser.newPage();
  await page.goto("https://images.google.com");
  await page.screenshot({ path: 'screenshots/example.png' });

  // Input the search term and hit Enter
  console.log('Hello can I get uhhhh some ' + searchTerm);
  await page.type('#lst-ib', searchTerm);
  await page.keyboard.press('Enter');
  await page.waitForSelector('#hdtb-msb-vis');

  await page.addScriptTag({url: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js'});

  // Scroll to the bottom of the page
  console.log('Now I am scrolling to the bottom of the page vroom vroom bois');
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
      let metaText = document.querySelector(index).childNodes[1].innerHTML;
      return JSON.parse(metaText).ou;
    }, i));
  }

  // get all the images at the urls
  for (let i = 0; i < urls.length; i++) {
    // console.log(urls[i]);
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
        // let pyImageDir = '.\\downloaded_images\\'+ dirTerm + '\\' + i + '.jpg';
        // const pythonProcess = spawn('python',['./check_images.py', pyImageDir]);
        // pythonProcess.stdout.on('data', (data) => {
        //   console.log(data);
        // });
      });
    }).on('error', function(err, cb) {
      fs.unlink(fileName);
      console.log(i + ' was deleted');
      if (cb) cb(err.message);
    });
  };

  await browser.close();
})();
