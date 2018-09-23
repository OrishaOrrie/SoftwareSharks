import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const serviceAccount = 'priv/serviceAccountKey.json';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'softwaresharks-ninshiki.appspot.com'
});

// const environment = {
//   firebase: {
//     apiKey: 'AIzaSyBFmgwBqG14FM-umd-Jz1fi7pfVt2rDlAc',
//     authDomain: 'testproject-ee885.firebaseapp.com',
//     databaseURL: 'https://testproject-ee885.firebaseio.com',
//     projectId: 'testproject-ee885',
//     storageBucket: 'testproject-ee885.appspot.com',
//     messagingSenderId: '55902150213'
//   }
// };
// firebase.initializeApp(environment);

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

  mailTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      response.status(500).send("Error: Email not sent");
    } else {
      console.log("Message sent: " + info.repsonse);
      response.status(200).send("Email Sent");
    };
  });
});


// ====================================================================================================
// TensorFlow JS Sections
// tensorflow/tfjs
// ====================================================================================================

//const storage = functions.storage;
// const storage = firebase.storage();
// let test = admin.storage().bucket('gs://testproject-ee885.appspot.com').get()

import * as tf from '@tensorflow/tfjs';
const {Image} = require('canvas-prebuilt');
//import * as canvas from 'canvas';

export const upload = functions.https.onRequest(async (request, response) => {
  // response.send("Hello from Firebase!");
  // console.log(admin.storage().bucket());
  // console.log(admin.storage().bucket().get());
  // console.log(admin.storage().bucket().file('images/vicious_dog_0.png'));
  //console.log(admin.storage().bucket().getFiles('images/vicious_dog_0.png'));
  try {
    // const snapshot = await admin.storage().bucket().file('images/vicious_dog_0.png').getMetadata();
    // const metadata = snapshot[0];
    // console.log(`File: ${metadata.name}`);
    // console.log(`Bucket: ${metadata.bucket}`);
    // console.log(`Size: ${metadata.size}`);
    // const snapshot = 
    await admin.storage().bucket().file('tfjs/model.json').get()
      .then(imageSnapshot => {
        loadModel(imageSnapshot).then((model)=>{
          const image = new Image();
          image.src = 'https://i.pinimg.com/236x/f8/ca/43/f8ca4391f64eb8bba6fd908f4046fbca--funny-chihuahua-quotes-funny-chihuahuas.jpg';
          const tensor = tf.fromPixels(image);
          console.log(model.predict(tensor));
        }).catch(error => {console.log(error)});
        // return (async () => {
        //   await tf.tidy(() => {
        //     const predictions = model.predict(img);
        //     // let img = tf.fromPixels();
        //     // img = img.reshape([3, 229, 229]);
        //     // img = tf.cast(img, 'float32');
        //     // const output = this.model.predict(img) as any;
        //     // this.predictions = Array.from(output.dataSync());
        //     // console.log(this.predictions);
        //   });
        // });
      }).catch(error => {
        console.log(error);
      });
    response.status(200).send('Success');
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

async function loadModel(onlineModel) {
  try {
    const model = await tf.loadModel(onlineModel);
    return model;
  } catch (error) {
    return null;
    //return "ERROR: Model Failed Loaded: " + error;
  }
}
//  async function loadModel() {
//   const ref = storage.ref('tfjs/model.json');
//   try {
//     const model = await tf.loadModel(ref);
//     return "Model Loaded Successfully";
//   } catch (err) {
//     return "ERROR: Model Failed Loaded: " + err ;
//   }
//   // console.log('Model Loaded!');
// }

// // function downloadModel() {
// //   const ref = storage.ref('tfjs/model.json');
// //   this.modelRef = ref;
// //   console.log('Model Downloaded!');
// //   this.downloadedModel = true;
// // }

// async function predict() {
//   await tf.tidy(() => {
//     let img = tf.fromPixels(image);
//     img = img.reshape([3, 229, 229]);
//     img = tf.cast(img, 'float32');

//     const output = this.model.predict(img) as any;

//     this.predictions = Array.from(output.dataSync());
//     console.log(this.predictions);
//   });
// }

// /**
//  * This function reloads the page when the Upload Another Image button is clicked.
//  */
// async function reloadPage() {
//   console.log(await tf.io.listModels());
//   // window.location.reload(true);
// }