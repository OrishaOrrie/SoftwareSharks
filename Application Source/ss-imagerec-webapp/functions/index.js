const functions = require('firebase-functions');
const express= require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const _httpCodes = require('./local_modules/HTTPRequests.js');
const _logger = require('./local_modules/logger.js');
const pyShell = require('python-shell');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/send', (request, response) => {
  console.log('');
  console.log('/send received a request \n');
  response.send(`${Date.now()}`);
});

app.get('/send-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  response.send(`${Date.now()}`);
});

/**
    NODEMAILER STUFF
*/

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'softwaresharks@gmail.com',
    pass: '0r@ng3IsTh3N3wBl@ck'
  }
});

app.post('/sendmail', (request, response) => {

  console.log('/sendmail received a request\n');
  console.log('Request: \n');
  console.log('Email: ' + request.body.email + '\n');
  const mailOptions = {
    from: request.body.email,
    to: 'softwaresharks@gmail.com',
    subject: 'Customer called ' + request.body.subject + ' has a query',
    text: 'Query from address: ' + request.body.email + '\n' + request.body.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, (error, res) => {
    if(error) {
      console.log(error);
      response.json({ message: 'Message not sent'});
      response.status(400).end();
    } else {
      console.log('Message sent: ' + res.message);
      response.json({ message: 'Message sent'});
      response.status(200).end();
    }
  })

});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.status(_httpCodes.RESPONSE.OKAY).send('Hello and Welcome to the Test Environment NodeJS Development Server');
});

exports.app = functions.https.onRequest(app);
