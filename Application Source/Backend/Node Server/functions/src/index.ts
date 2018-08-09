import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// ====================================================================================================
// MAIL SECTION
// nodemailer
// ====================================================================================================
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const sendMail = functions.https.onRequest((request, response) => {
    console.log('/sendmail received a request\n');
    console.log('Request: \n');
    //console.log('Email: ' + request.body.email + '\n');
    const mailOptions = {
        from: '"SoftwareSharks"',
        to: 'mark.coetzerjnr@gmail.com',
        subject: 'Testing NodeMailer',
        text: 'Random Text Here'
    };    

    mailTransport.sendMail( mailOptions, (error, info ) => {
        if (error) {
            console.log(error);
            response.status(500).send("Error: Email not sent");
          } else {
            console.log("Message sent: " + info.repsonse);
            response.status(200).send("Email Sent");
         };
    });
});