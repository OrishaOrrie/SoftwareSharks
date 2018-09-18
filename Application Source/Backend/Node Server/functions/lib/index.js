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
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = 'priv/serviceAccountKey.json';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'softwaresharks-ninshiki.appspot.com'
});
const { createCanvas, Image } = require('canvas-prebuilt');
const canvas = createCanvas(28, 28);
const ctx = canvas.getContext('2d');
const image = new Image();
image.onload = () => ctx.drawImage(image, 0, 0);
image.onerror = err => { throw err; };
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
const imageData = ctx.getImageData(0, 0, 28, 28);
// const tensor = tf.fromPixels(imageData);
//import * as canvas from 'canvas';
exports.upload = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield admin.storage().bucket().file('tfjs/model.json').get()
            .then(snapshot => {
            console.log(snapshot[0].createReadStream());
        })
            .catch(error => {
            console.log(error);
        });
        // await tf.loadModel('https://firebasestorage.googleapis.com/v0/b/softwaresharks-ninshiki.appspot.com/o/tfjs%2Fmodel.json?alt=media&token=ebd6ff59-a44a-4272-a7b2-cc4e1c1a8d0d')
        // .then(async (model) => {
        //   await tf.tidy(() => {
        //     let img = tf.fromPixels(imageData);
        //     img = img.reshape([3, 229, 229]);
        //     img = tf.cast(img, 'float32');
        //     const output = model.predict(img) as any;
        //     const predictions = Array.from(output.dataSync());
        //     console.log(predictions);
        //   });
        // })
        // .catch((error) => {
        //   console.log(error)
        // });
        // console.log('LOAD MODEL: ' + model);
        response.status(200).send('Success');
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
}));
// export const upload = functions.https.onRequest(async (request, response) => {
//   // response.send("Hello from Firebase!");
//   // console.log(admin.storage().bucket());
//   // console.log(admin.storage().bucket().get());
//   // console.log(admin.storage().bucket().file('images/vicious_dog_0.png'));
//   //console.log(admin.storage().bucket().getFiles('images/vicious_dog_0.png'));
//   try {
//     // const snapshot = await admin.storage().bucket().file('images/vicious_dog_0.png').getMetadata();
//     // const metadata = snapshot[0];
//     // console.log(`File: ${metadata.name}`);
//     // console.log(`Bucket: ${metadata.bucket}`);
//     // console.log(`Size: ${metadata.size}`);
//     // const snapshot = 
//     await admin.storage().bucket().file('tfjs/model.json').get()
//       .then(imageSnapshot => {
//         loadModel(imageSnapshot).then((model)=>{
//           const image = new Image();
//           image.onload = () => ctx.drawImage(image, 0, 0);
//           image.onerror = err => { throw err };
//           image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
//           const imageData = ctx.getImageData(0,0,28,28);
//           const tensor = tf.fromPixels(imageData);
//           console.log(model.predict(tensor));
//         }).catch(error => {console.log(error)});
//         // return (async () => {
//         //   await tf.tidy(() => {
//         //     const predictions = model.predict(img);
//         //     // let img = tf.fromPixels();
//         //     // img = img.reshape([3, 229, 229]);
//         //     // img = tf.cast(img, 'float32');
//         //     // const output = this.model.predict(img) as any;
//         //     // this.predictions = Array.from(output.dataSync());
//         //     // console.log(this.predictions);
//         //   });
//         // });
//       }).catch(error => {
//         console.log(error);
//       });
//     response.status(200).send('Success');
//   } catch (error) {
//     console.log(error);
//     response.status(500).send(error);
//   }
// });
// async function loadModel(onlineModel) {
//   try {
//     // const model = await tf.loadModel(onlineModel);
//     const model = await tf.loadModel('https://firebasestorage.googleapis.com/v0/b/softwaresharks-ninshiki.appspot.com/o/tfjs%2Fmodel.json?alt=media&token=ebd6ff59-a44a-4272-a7b2-cc4e1c1a8d0d');
//     console.log('LOAD MODEL: ' + model);
//     return model;
//   } catch (error) {
//     console.log('LOAD MODEL: FAILED: ' + error);
//     return null;
//     //return "ERROR: Model Failed Loaded: " + error;
//   }
// }
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
//# sourceMappingURL=index.js.map