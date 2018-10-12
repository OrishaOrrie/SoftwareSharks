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
let db: FirebaseFirestore.Firestore = null;
let uid = null;

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
    db = admin.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    db.settings(settings);

    console.log('Successfully initialised Firebase Admin SDK');
}

export function verifyToken(idToken) {
    checkSetInit();
    try {
        return admin.auth().verifyIdToken(idToken)
            .then((decodedToken) => {
                console.log('Successfully verified user!');
                uid = decodedToken.uid;
                return uid;
            }).catch((error) => {
                console.error('Error verifying user: ' + error);
                // Promise.reject(error);
                throw error;
                // return error;
            });
    } catch (error) {
        console.error('Error attempting to call verifyIdToken(): ' + error);
        return error;
    }
}

export function setTraining(modelId: string, newStatus: string) {
    const docRef = db.collection('users').doc(uid).collection('model').doc(modelId);

    return docRef.update({
        status: newStatus
    });
}
