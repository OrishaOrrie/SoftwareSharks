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
const http = require('http');
const port=3000;

let body = "";

const requestHandler = (request,response) => {
    body = "<h1>Hello Node.js Server!</h1>";
    if(request.url==="/trainModel") {
        //Todo: Need to find out how dashboard 
        //will post categories to create
        
        console.log("Training Model");
        body+="<p>Training Model Now</p>"
    }
    else if(request.url==="/predict") {
        //Todo: Need to find out how the 
        //dashboard will post images to predict
        
        console.log("Predicting");
        body+="<p>Predicting Now</p>";
    }
    else {
        console.log(request.url);
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(body);
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if(err) {
        return console.log('ERROR',err);
    }

    console.log('Server is listening on %s', port);
});