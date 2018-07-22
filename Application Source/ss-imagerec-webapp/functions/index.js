const functions = require('firebase-functions');
const express= require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());

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
    pass: 'SoftwareSharks123'
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
  smtpTransport.sendMail(mailOptions, function(error, res) {
    if(error) {
      console.log(error);
      response.end('error');
    } else {
      console.log('Message sent: ' + res.message);
      response.json({ message: 'Message sent'});
      response.status(200).end();
    }
  })

});

exports.app = functions.https.onRequest(app);
