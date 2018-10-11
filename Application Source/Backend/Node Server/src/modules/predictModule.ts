/*
    File Name: predictModule.ts
    Version Number: 1.0.0
    Author Name: Jonathan Lew
    Project Name: Ninshiki
    Organization: Software Sharks
    Update History:
    Functional Description: This module is here to
        allow for predicting from a model based on
        user input.
*/

import {PythonShell} from 'python-shell';

export async function predictModule(payload, logger) {
    console.log('Predict Module');
    //console.log('Header: '+payload.header);
    //console.log('Image: '+payload.image);

    const header = payload.header;
    const url = payload.image;
    const numResults = payload.numResults;

    const predict = new Promise(async (resolve) => {
        const predictFile = './external_modules/Keras Training Model/predict-mobilenet.py';
        const pyPredict = new PythonShell(predictFile);

        // './'+header+'_model/'+header+'_dataset/'+header+'-mobilenet-tf.h5'
        //pyPredict.send( './'+header+'_model/'+header+'_dataset/'+header+'-mobilenet-tf.h5');
        pyPredict.send(header);
        pyPredict.send(url);
        pyPredict.send(numResults);
        // console.log("Sending");
        pyPredict.on('message', (message) => {
            if(message.substring(0,6) == 'Result') {
                message = message.substring(6);
                var results = message.split('|');
                console.log("Class: "+results[0]+", Likeness: "+results[1]);
            } else {
                console.log('Python Predicter: ' + message);
            }
        });
        pyPredict.end((err, code, signal) => {
            if (err) {
                // logger.error('Error: ' + err);
                throw err;
            }
            logger.debug('Exited with code <' + code + '> and signal ' + signal);
            resolve('predicting completed');
        });
    });
    const predicted = await predict;
    console.log(predicted);

}
