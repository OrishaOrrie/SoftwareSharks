/*
    File Name: server.ts
    Version Number: 1.0.0
    Author Name: Jonathan Lew
    Project Name: Ninshiki
    Organization: Software Sharks
    Update History:
    Functional Description: This class is here to
        create a backend server for the dashboard
*/

import http = require('http');

// import jsonBody = require('body/json');
// import sendJson = require('send-data/json');

import fb = require('./modules/firebaseAdmin');
import predictModule = require('./modules/predictModule');
import trainModule = require('./modules/trainModule');
fb.initFirebaseAdmin();

import { ConfirmationResponse } from './models/confirmation-response';
import { ErrorResponse } from './models/error-response';
import { HTTP_STATUS_CODES } from './models/http-codes';
import { Logger } from './modules/logger';

const port = process.env.npm_package_config_port;
const logger = new Logger(true, true, true);
//  let body = '';

const requestHandler = (request, response) => {
    const responseHeaders = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Keep-Alive',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': 2592000, // 30 days,
        /** add other headers as per requirement */
    };

    // if request = OPTIONS
    // simply writes the headers to the response and
    // results in a 204 (No Content) to the browser.
    if (request.method === 'OPTIONS') {
        response.writeHead(HTTP_STATUS_CODES.NO_CONTENT, responseHeaders);
        response.end();
        return;
    }

    if (['GET', 'POST'].indexOf(request.method) > -1) {
        // NB: No need for this to run in the entire request body
        // Create a new request and post it to client once its complete
        // Because this will obv take a while
        if (request.url === '/trainModel') {
            if (request.headers.authorization) {
                fb.verifyToken(request.headers.authorization)
                    .then(
                        (uid) => {
                            trainModelFunction(request, response, responseHeaders);
                        })
                    .catch(
                        (err) => {
                            // --------------------------------------------------
                            // Todo: COMMENT WHEN IN PROD
                            // --------------------------------------------------
                            trainModelFunction(request, response, responseHeaders);
                            // --------------------------------------------------

                            // --------------------------------------------------
                            // Todo: REMOVE WHEN IN PROD
                            // --------------------------------------------------
                            // logger.error('Verification Error: ' + err);
                            // // console.error('Verification Error: ' + err);
                            // const errorResponse: ErrorResponse = {
                            //     code: HTTP_STATUS_CODES.FORBIDDEN,
                            //     acknowledgement: 'Error - Verification: Train Request Rejected!',
                            //     data: 'No data',
                            // };
                            // response.writeHead(HTTP_STATUS_CODES.FORBIDDEN, responseHeaders);
                            // response.write(JSON.stringify(errorResponse));
                            // response.end();
                            // --------------------------------------------------
                        },
                    );
            } else {
                // Todo: Look into establishing persistant logs on firebase.
                // Todo: Look into adding more information into the log (Request IP etc)
                logger.error('Error: Unauthorised Request.');
                // console.error('Error: Unauthorised Request.');
                const errorResponse: ErrorResponse = {
                    code: HTTP_STATUS_CODES.UNAUTHORISED,
                    acknowledgement: 'Error - Unauthorised: Train Request Rejected!',
                    data: 'No data',
                };
                response.writeHead(HTTP_STATUS_CODES.UNAUTHORISED, responseHeaders);
                response.write(JSON.stringify(errorResponse));
                response.end();
            }
            // response.end(confirmResponse);

            // Todo: Do proper verification comments here
            // console.log(request.body);

            // Todo: Need to find out how dashboard
            // will post categories to create
            //  const data = [];

            //  console.log('Training Model');
            // // Todo: Uncomment When done testing
            //  request.on('data', (chunk) => {
            //      data.push(chunk);
            //  });
            //  request.on('end', () => {
            //      try {
            //          let categories = JSON.parse(data.toString());
            //          console.log("Categories: "+categories);

            //          // Deal with categories using trainModule.js

            //          // Todo: Establish after bug testing
            //          trainModule.trainModule(categories);

            //         body += "<p>Training Model Now</p>"
            //         body += "<p>" + JSON.stringify(categories) + "</p>";

            //         response.writeHead(200, { 'Content-Type': 'text/html' });
            //         response.end(body);
            //     } catch (err) {
            //         if (err instanceof SyntaxError) {
            //             console.error('Syntax Error: ' + (err));
            //         } else {
            //             console.error('Unknown Error: ' + err);
            //         }
            //     }
            // });
        } else if (request.url === '/predict') {
            // Todo: Need to find out how the
            // dashboard will post images to predict

            logger.info('Predicting');
            // console.log('Predicting');

            // body += '<p>Predicting Now</p>';

            // Deal with image posted using predictModule.js
            // predictModule.predictModule(img.jpg);

            response.writeHead(HTTP_STATUS_CODES.NOT_IMPLEMENTED, { 'Content-Type': 'text/html' });
            // response.end(body);
        } else {
            logger.error(request.url + ' does not exist!');
            // console.log(request.url + ' does not exist!');
        }
        return;
    }

    // Method NOT GET/POST
    response.writeHead(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED, responseHeaders);
    response.end(`${request.method} is not allowed for the request.`);
};

const server = http.createServer(requestHandler);

server.listen(port || 8080, (err) => {
    if (err) {
        return console.log('ERROR', err);
    }
    logger.info('----------------------------------------');
    logger.info('Server Initialised');
    logger.info('----------------------------------------');
    logger.info('Server is listening on: ' + port);
});

let trainModelFunction = function (request, response, responseHeaders) {

    const body = [];
    request.on('error', (err) => {
        logger.error('Request Error: ' + err);
        // console.error('Request Error: ' + err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        const result = Buffer.concat(body).toString();
        try {
            const payload = JSON.parse(result.toString());
            logger.debug(result);
            console.log('Categories: ' + payload);

            // Deal with categories using trainModule.js

            // Todo: Establish after bug testing
            trainModule.trainModule(payload,logger);

            response.on('error', (err) => {
                logger.error('Response Error: ' + err);
            });
            response.writeHead(HTTP_STATUS_CODES.ACCEPTED, responseHeaders);
            const confirmResponse: ConfirmationResponse = {
                acknowledgement: 'Train Request Accepted!',
                data: 'No data',
            };
            response.write(JSON.stringify(confirmResponse));
            response.end();
        } catch (err) {
            if (err instanceof SyntaxError) {
                console.error('Syntax Error: ' + (err));
            } else {
                console.error('Unknown Error: ' + err);
            }
        }
    });
}