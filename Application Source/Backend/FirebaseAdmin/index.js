// let admin = require('firebase-admin');
// let serviceAccount = require('./private_key/testproject-ee885-firebase-adminsdk-mqdgy-b964b7fd30.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://testproject-ee885.firebaseio.com',
//     storageBucket: 'testproject-ee885.appspot.com'
// });

// var bucket = admin.storage().bucket();

let firebase = require('firebase');

let config = {
    apiKey: "AIzaSyBFmgwBqG14FM-umd-Jz1fi7pfVt2rDlAc",
    authDomain: "testproject-ee885.firebaseapp.com",
    databaseURL: "https://testproject-ee885.firebaseio.com",
    projectId: "testproject-ee885",
    storageBucket: "testproject-ee885.appspot.com",
    messagingSenderId: "55902150213"
};

firebase.initializeApp(config);

let storage = firebase.storage();
let storageRef = storage.ref();