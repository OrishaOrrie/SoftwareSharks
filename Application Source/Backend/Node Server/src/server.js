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
const trainModule = require('./modules/trainModule');
const predictModule = require('./modules/predictModule');

const fb = require('./modules/firebaseAdmin');
fb.initFirebaseAdmin();

const port=3000;

let body = "";

const requestHandler = (request,response) => {
    body = "<h1>Hello Node.js Server!</h1>";
    if(request.url==="/trainModel") {
        //Todo: Need to find out how dashboard 
        //will post categories to create
        let data=[];
        
        console.log("Training Model");

        request.on('data', chunk => {
            data.push(chunk);
        });
        request.on('end',() => {
            let categories=JSON.parse(data);
            //console.log(categories);
            
            //Deal with categories using trainModule.js
            trainModule.trainModule(categories);

            body+="<p>Training Model Now</p>"
            body+="<p>"+JSON.stringify(categories)+"</p>";
            
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(body);
        });
    }
    else if(request.url==="/predict") {
        //Todo: Need to find out how the 
        //dashboard will post images to predict
        
        console.log("Predicting");
        body+="<p>Predicting Now</p>";

        //Deal with image posted using predictModule.js
        //predictModule.predictModule(img.jpg);

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(body);
    }
    else {
        console.log(request.url+" does not exist!");
    }
    
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if(err) {
        return console.log('ERROR',err);
    }

    console.log('Server is listening on %s', port);
});