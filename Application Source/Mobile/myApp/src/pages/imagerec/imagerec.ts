/**
 * File Name:       imagerec.ts
 * Version Number:  v1.1
 * Author:          Orisha Orrie
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 20/07/2018   Orisha        Created component
 * 08/15/2018   Orisha        Added Custom Image Upload Functionality
 * ------------------------------------------
 * Test Cases:      imageupload.component.spec.ts
 * Functional Description:
 *  Provides interface for user to select or capture an image and upload
 *  it to the system server. Displays results of image classification.
 */
// import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as tf from '@tensorflow/tfjs';
import { ModalController } from 'ionic-angular';
import { ModelLoaderProvider } from './../../providers/model-loader/model-loader';
// import { AngularFireStorage } from '../../../node_modules/angularfire2/storage';
import { Result } from './result';
// import { Observable } from '../../../node_modules/rxjs/internal/Observable';
// import { MatTableDataSource, MatSort } from '@angular/material';
// import { DataSource } from '@angular/cdk/table';
import { AboutPage } from '../about/about';
import { ResultsPage } from '../results/results';
/**
 * Generated class for the ImagerecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var require: any
@Component({
  selector: 'page-imagerec',
  templateUrl: 'imagerec.html'
})

/**
 * 
 * ORISHA'S CODE IS HERE
 * 
 */
//content: new ViewChild('content');
export class ImagerecPage {
	@ViewChild('content') content:any;
		public showSpinner = false;
			
		/**
		 * This variable is a reference to the file that will be uploaded, either selected or captured
		 */
		public imageToUpload: File = null;
		
		/**
		 * Determines whether the file to upload was selected from the file explorer or captured via webcam
		 */
		public uploadCapture = false;
		
		/**
		 * Determines if an image is available to be uploaded
		 */
		public imgAvailable = false;
		public imgSelectedOrCaptured = false;
		public predictions: any;
		public modelRef = null;
		public resultPreds = [];
		public displayedColumns = ['name', 'likeliness'];
		public model: tf.Model;
		public modelStatus = '';
		public results: Result[] = [];
		public resultsReady = false;
		public myPhoto= "assets/imgs/camera-holder.png";
		public imageToPredict: HTMLImageElement;
		public predictButtonText = 'Loading...';
		public notReadyToPredict = true;
		public loading = this.loadingController.create({
			spinner: 'crescent',
			content: 'Making a Prediction...'
		});
		
		constructor( public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private alertCtrl: AlertController,
			private camera: Camera, public loadingController: LoadingController, public modelLoader: ModelLoaderProvider ) {
		
			// Carries out the code below every second
			let modelLoaded = setInterval(() => {
				if (this.modelLoader.modelIsReady()) {
					console.log('Model Ready');	
					this.model = this.modelLoader.getModel();
					this.predictButtonText = 'Predict';
					this.notReadyToPredict = false;
					clearInterval(modelLoaded);
				} else {
					console.log('Not Ready');			
				}
			},500);
		}
		
		openModal()
		{
			var data = { message : 'hello world' };
			var homePage = this.modalCtrl.create(AboutPage,data);
			homePage.present();
		}

	ngOnInit() 
	{

	}
	
	resultsModal()
  	{
		var data = { message : 'hello world' };
		var homePage = this.modalCtrl.create(AboutPage,data);
		homePage.present();
	  }

	  ///////////////////thissss added
	  presentResults() {
		let resultsModal = this.modalCtrl.create(ResultsPage,  this.resultPreds);
		resultsModal.present();
	  }
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad ImagerecPage');
		//this.content.scrollToBottom(300);
	};
		
	/**
	 * 
	 * IONIC FUNTION TO USE CAMERA
	 * 
	 */
		takePic(pictureSourceType: any){
			const options: CameraOptions = {
				quality: 95,
				destinationType: this.camera.DestinationType.DATA_URL,
				encodingType: this.camera.EncodingType.JPEG,
				mediaType: this.camera.MediaType.PICTURE,
				saveToPhotoAlbum : true,
				allowEdit :true,
				targetWidth :300,
				targetHeight :300
			}

			this.camera.getPicture(options).then((imageData) => {
				// imageData is either a base64 encoded string or a file URI
				// If it's base64 (DATA_URL):
				this.myPhoto = 'data:image/jpeg;base64,' + imageData;
				this.content.scrollToBottom(1000);
				let image = <HTMLImageElement>document.getElementById('selectedImage');
				this.imageToPredict = image;
				this.imgSelectedOrCaptured = true;
			}, (err) => {
				// Handle error
				this.imgSelectedOrCaptured = false;
				this.imgAvailable = false;
				let prompt = this.alertCtrl.create({
					title: 'Error getting captured image',
					subTitle: err,
					buttons: ['OK']
				});
				prompt.present();
			});
			
			this.imgAvailable = true;
		};
	  
/**
 * 
 * IONIC FUNCTION TO SELECT FROM GALLERY
 * 
 */

  		selectPic()
  		{
			const options: CameraOptions = {
				quality: 100,
				destinationType: this.camera.DestinationType.DATA_URL,
				encodingType: this.camera.EncodingType.JPEG,
				sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
				saveToPhotoAlbum :false,
				allowEdit :true,
				targetWidth :300,
				targetHeight :300
			}

			this.camera.getPicture(options).then((imageData) => {
				// imageData is either a base64 encoded string or a file URI
				// If it's base64 (DATA_URL):
				
				this.myPhoto = 'data:image/jpeg;base64,' + imageData;
				this.content.scrollToBottom(1000);
				let image = <HTMLImageElement>document.getElementById('selectedImage');
				this.imageToPredict = image;
				this.imgSelectedOrCaptured = true;
			}, (err) => {
				// Handle error
				this.imgSelectedOrCaptured = false;
				this.imgAvailable = false;
				let prompt = this.alertCtrl.create({
					title: 'Error getting selected image',
					subTitle: err,
					buttons: ['OK']
				});
				prompt.present();
			});
			
			this.imgAvailable = true;
			
		};

		/**
		 * predictImage() is called when the classify button is clicked.
		 * Then the predict() function is called. Here stuff happens in tf.tidy.
		 * Stuff includes reading the image into a Tensor, cropping, resizing, and predicting the thing.
		 * Then, the predictions are mapped to the correct classes. Thanks
		 */

		predictImage() {
			// this.res();
			// this.loading.present();
			this.predict()
				.then((data) => {
					// this.loading.dismiss();
					this.mapPredictions(data);
					this.presentResults();
					this.predictButtonText = 'Predict';
				}).catch((error) => {
					alert('Sorry, your device does not seem to be optimized to run AI computations. Apologies\n' + error);
				});

			//this.mapPredictions(classId);
			// this.predict()
			// .then(() => {
			// 	this.presentResults();
			// 	this.predictButtonText = 'Predict';
			// });
			// this.content.scrollToBottom();
		};

		async predict() {

			console.log('Predicting');
		
			const predictedClass = tf.tidy(() => {
				let image = <HTMLImageElement>document.getElementById('selectedImage');
				this.imageToPredict = image;

				this.predictButtonText = 'Predicting...';
				const raw = tf.fromPixels(this.imageToPredict, 3);
				const cropped = this.cropImage(raw);
				const resized = tf.image.resizeBilinear(cropped, [224, 224]);
				const batchedImage = resized.expandDims(0);
				const img = batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
				const predictions = (this.model.predict(img) as tf.Tensor);
				console.log('Still predicting: ');
				return predictions;
			});
		
			const classId = (await predictedClass.dataSync());
			predictedClass.dispose();
		
			return classId;
		};
		
		cropImage(img) {
			const size = Math.min(img.shape[0], img.shape[1]);
			const centerHeight = img.shape[0] / 2;
			const beginHeight = centerHeight - (size / 2);
			const centerWidth = img.shape[1] / 2;
			const beginWidth = centerWidth - (size / 2);
			return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
		};
		
		mapPredictions(classPreds) {
			const classesJson = require('../../assets/classes/classes.json');
			const numClasses = classPreds.length;
			this.resultPreds = [];
			for (let i = 0; i < numClasses; i++) {
			  this.resultPreds[i] = {};
			  this.resultPreds[i].id = classesJson.classes[i].id;
			  this.resultPreds[i].first = classesJson.classes[i].first;
			  this.resultPreds[i].name = classesJson.classes[i].name;
			  this.resultPreds[i].likeliness = (classPreds[i] * 100).toFixed(4);
			}
			this.sortPreds();
			this.resultsReady = true;
			console.log(this.resultPreds[0].name);
			this.modelLoader.setResults(this.resultPreds);
			//this.modelStatus = this.resultPreds[0].name + ' ' + this.resultPreds[0].likeliness + '%';
		};

		// res()
		// {
		// 	this.presentPredictingSpinner();
		// 	//alert('sdfrrer');
		// 	//this.presentAlert(this.modelStatus);
			
		// };

		sortPreds() {
			this.resultPreds.sort(function(a, b) {
			  return b.likeliness - a.likeliness;
			});
		};

		presentLoadingModelSpinner() {
			let loading = this.loadingController.create({
				spinner: 'crescent',
				content: 'Loading...'
			});

			loading.present();

			setTimeout(() => {
				loading.dismiss();
			}, 2000);
		}

		// presentPredictingSpinner() {
			
			
		// 	loading.present();
		// 	this.resultPreds = [];
		// 	this.resultsReady = false;
		// 	this.predict()
		// 	.then(() => {
		// 		loading.dismiss;
		// 		this.presentResults();
		// 	});

		// 	setTimeout(() => {
		// 		loading.dismiss();
		// 	}, 2000);
		// }
		
}
