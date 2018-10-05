/*
    File Name: server.js
    Version Number: 1.0.0
    Author Name: Jonathan Lew
    Project Name: Ninshiki
    Organization: Software Sharks
    Update History:
    Functional Description: This class is here to
        create a backend server for the dashboard
*/
const http = require("http");
const trainModule = require("./modules/trainModule");
const predictModule = require("./modules/predictModule");

const fb = require("./modules/firebaseAdmin");
fb.initFirebaseAdmin();

const port = process.env.npm_package_config_port;

let body = "";

const requestHandler = (request, response) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": 2592000, // 30 days,
        "Access-Control-Allow-Credentials": "true",
        /** add other headers as per requirement */
    };

    // if request = OPTIONS
    // simply writes the headers to the response and
    // results in a 204 (No Content) to the browser.
    if (request.method === "OPTIONS") {
        response.writeHead(204, headers);
        response.end();
        return;
    }

    if (["GET", "POST"].indexOf(request.method) > -1) {
        // 200 - Okay
        response.writeHead(200, headers);

        // Todo: Write a quick response here - As confirmation:
        response.end("Request Accepted");

        // NB: No need for this to run in the entire request body
        // Create a new request and post it to client once its complete
        // Because this will obv take a while

        if (request.url === "/trainModel") {

            // Todo: Need to find out how dashboard
            // will post categories to create
            const data = [];

            console.log("Training Model");

            request.on("data", (chunk) => {
                data.push(chunk);
            });
            request.on("end", () => {
                try {
                    // let categories = JSON.parse(data);
                    // console.log(categories);

                    // Deal with categories using trainModule.js

                    // Todo: Establish after bug testing
                    // trainModule.trainModule(categories);

                    // body += "<p>Training Model Now</p>"
                    // body += "<p>" + JSON.stringify(categories) + "</p>";

                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.end(body);
                } catch (err) {
                    if (err instanceof SyntaxError) {
                        console.error("Syntax Error: " + (err));
                    } else {
                        console.error("Unknown Error: " + err);
                    }
                }
            });
        } else if (request.url === "/predict") {
            // Todo: Need to find out how the
            // dashboard will post images to predict

            console.log("Predicting");
            body += "<p>Predicting Now</p>";

            // Deal with image posted using predictModule.js
            // predictModule.predictModule(img.jpg);

            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(body);
        } else {
            console.log(request.url + " does not exist!");
        }
        return;
    }

    // Method NOT GET/POST
    response.writeHead(405, headers);
    response.end(`${request.method} is not allowed for the request.`);
};

const server = http.createServer(requestHandler);

server.listen(port || 8080, (err) => {
    if (err) {
        return console.log("ERROR", err);
    }

    console.log("Server is listening on %s", port);
});
