/* 
    File Name: firebaseAdmin.js
    Version Number: 1.0.0
    Author Name: Mark Coetzer
    Project Name: Ninshiki
    Organization: Software Sharks
    Update History:
    Functional Description: This module allows for firebase integration.
*/
var admin = require('firebase-admin');

var serviceAccount = require("../environment/AccountKey.json");
var initialized = false;

exports.checkSetInit = function() {
    if(!initialized) {
        initFirebaseAdmin();
    }
}

exports.initFirebaseAdmin = function() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://softwaresharks-ninshiki.firebaseio.com"
    });
    this.initialized = true;
    console.log('Successfully initialised Firebase Admin SDK');
}

exports.verifyToken = function(idToken) {
    checkSetInit();
    admin.auth().verifyIdToken(idToken)
    .then(function (decodeToken) {
        var uid = decodedToken.uid;
    }).catch(function (error) {
        console.log(error);
    });
}