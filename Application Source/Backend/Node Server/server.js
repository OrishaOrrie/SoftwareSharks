/***
 * Dependencies
 */
const path = require('path')
const express = require('express')
const multer = require('multer')
const fs = require('fs');
const bodyParser = require('body-parser')
const uppy = require('uppy-server')

/**
 * Express
 */
const app = express()

/**
 * BodyParser
 */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * Start of email thing
 */
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "softwaresharks@gmail.com",
        pass: "SoftwareSharks123"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
app.get('/',function(req,res){
    //res.sendfile('../ss-imagerec-webapp/contact-us.component.html');
  
    res.sendFile(path.resolve('../../ss-imagerec-webapp/src/app/contact-us/contact-us.component.html'));
    //Users/Orisha/Documents/3rdyear/COS301/git folder/SoftwareSharks/ss-imagerec-webapp/src/app/contact-us/contact-us.component.html
});
app.get('/send',function(req,res){
    var mailOptions={
        to : 'softwaresharks@gmail.com', //req.query.to,
        subject : req.query.subject,
        text : 'Email: '+req.query.email + ' Message: '+ req.query.text

    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});
/*
app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});
 /**
 * End of email thing
 */



/**
 * Multer
 */
var _uploadFilePath = ''
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      if(file.mimetype==('image/jpeg')){
        _uploadFilePath = 'upload.jpg'
        //cb(null, file.originalname + _fileType)
        cb(null, _uploadFilePath)
      }else if(file.mimetype==('image/png')){
        _uploadFilePath = 'upload.png'
        //cb(null, file.originalname + _fileType)
        cb(null, _uploadFilePath)
      }
  }
})

var upload = multer({ storage: storage })

/**
 * Uppy Options
 */

const uppy_options = {
	providerOptions: {
		google:{
			key: 'GOOGLE_KEY',
			secret: 'GOOGLE_SECRET'
		},
		instagram:{
			key: 'INSTA_KEY',
			secret: 'INSTA_SECRET'
		}
	},
	server:{
		host: "127.0.0.1:8000",
		protocol: "http"
	},
	filePath: "./upload"
}

app.use(uppy.app(uppy_options))

/**
 * Local Dependencies
 */
const _image = require('./local_modules/image.js')
const _httpCodes = require('./local_modules/HTTPRequests.js')
const _base64 = require('./local_modules/base64.js')
const _logger = require('./local_modules/logger.js')
const PythonShell=require('python-shell');
var pyshell;

app.use(_logger())

app.use(express.static(path.join(__dirname, 'public')))

app.locals.title = 'NodeJS Test Server'
app.locals.email = 'u14044537@tuks.co.za'

app.get('/', (req, res) => res.status(_httpCodes.RESPONSE.OKAY).send('Hello and Welcome to the Test Environment NodeJS Development Server'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Tus-Resumable","1.0.0");
  next();
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log('No file received')
    res.status(_httpCodes.RESPONSE.BAD_REQUEST).send('Invalid File / No File Recieved')
  } else {
    console.log('--------------')
    console.log('Received File:')
    console.log('--------------')
    //~ console.log('Attempting to Upload Image to Clarifai API...')
    //~ console.log('--------------')
    //~ _base64.base64_encode('./upload/' + _uploadFilePath, function(_base64String){
      //~ _image.predictImage(_base64String , function(_imageResponse){
	console.log("Attempting to Upload Image to Predict Model");
	pyshell.send('../upload/' + _uploadFilePath);
	console.log("sent");
	pyshell.on('message',function(message){
		console.log(message);
	});
	var predict=require('./Keras_Training_Model/predictions.json');
	
        console.log('--------------')
        console.log('Sending Upload Response:')
        console.log('--------------')
        //console.log(_imageResponse)
	console.log(predict)
        res.status(_httpCodes.RESPONSE.OKAY).json(predict)//(_imageResponse)
      }
    });

var server = app.listen(8000, () => {
	console.log('Test Environment NodeJS Development Server Running at: http://127.0.0.1:8000');
	callName();
})

function callName(){
	pyshell=new PythonShell('/Keras_Training_Model/predict.py');
	console.log("Server.js, Line 180:Sending model name");
	pyshell.send('inceptionv3-ft.model');
	console.log("Server.js, Line 182:Sent model name");
	pyshell.on('message',function(message){
		//console.log(message);//Prints out all messages
		if(message.substring(0,7)=="NodeJS:")
			console.log(message);
	});
	//~ pyshell.end(function(err){
		//~ if(err) throw err;
		
		//~ console.log('finished');
	//~ });
	
	//~ var options={
		//~ mode: 'text',
		//~ pythonOptions:['-u'],
		//~ args: ['inceptionv3-ft.model']
	//~ };
	
	//~ PythonShell.run('/Keras_Training_Model/predict.py',options, function(err,results){
		//~ if(err) throw err;
		//~ console.log('results: %j',results);
	//~ });
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}
