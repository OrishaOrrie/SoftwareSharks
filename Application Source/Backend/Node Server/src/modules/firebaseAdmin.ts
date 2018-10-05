/*
    File Name: firebaseAdmin.ts
    Version Number: 1.0.0
    Author Name: Mark Coetzer
    Project Name: Ninshiki
    Organization: Software Sharks
    Update History:
    Functional Description: This module allows for firebase integration.
*/

import * as admin from 'firebase-admin';
// tslint:disable-next-line:no-var-requires
const serviceAccount = require('../environment/AccountKey.json');
let initialized = false;

export function checkSetInit() {
    if (!initialized) {
        initFirebaseAdmin();
    }
}

export function initFirebaseAdmin() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://softwaresharks-ninshiki.firebaseio.com',
    });
    initialized = true;
    console.log('Successfully initialised Firebase Admin SDK');
}

export function verifyToken(idToken) {
    checkSetInit();
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
        const uid = decodedToken.uid;
        return uid;
    }).catch((error) => {
        console.log(error);
        return null;
    });
}
