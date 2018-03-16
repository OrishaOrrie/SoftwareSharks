var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var https = require('https');
var http = require('http');
var multer  = require('multer')
const sharp=require('sharp');
var upload = multer({ dest: 'uploads/' })

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.cert')
};

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var uploadFileName = "";

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });
var filenm="";
var filenmNew="";

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "uploads/");
  },
  filename: function(req, file, callback) {
    uploadFileName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
    callback(null, uploadFileName);
  }
});

//Image Modification Function
function ImageModification(){
sharp("uploads/"+uploadFileName)
	.greyscale()
	.toFile("greyscale/"+uploadFileName,function(err){
		
		});
}

var upload = multer({
  storage: Storage
}).array("imgUploader", 1); 

app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
      if (err) {
          return res.end("Something went wrong!" + err);
      }
      ImageModification();
      return res.sendFile(__dirname +'/display.html');
  });
});


// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');