/**
 * File Name:       imagerec.ts
 * Version Number:  v1.1
 * Author:          Tobias Bester, Orisha Orrie
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author		Description
 * 20/07/2018   Orisha		Created component
 * 15/08/2018   Orisha		Added Custom Image Upload Functionality
 * 15/08/2018	Tobias		Added backend for image recognition			
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
			content: 'Making a Prediction...',
			dismissOnPageChange: true
		});
		
		constructor( public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private alertCtrl: AlertController,
			private camera: Camera, public loadingController: LoadingController, public modelLoader: ModelLoaderProvider ) {
		
			// Carries out the code below every second
			let modelLoaded = setInterval(() => {
				if (this.modelLoader.modelIsReady()) {
					console.log('Model Ready');
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
			var data = { message : 'Results' };
			var homePage = this.modalCtrl.create(AboutPage,data);
			homePage.present();
		}

	ngOnInit() 
	{

	}
	
	resultsModal()
  	{
		var data = { message : 'Results' };
		var homePage = this.modalCtrl.create(AboutPage,data);
		homePage.present();
	  }

	  //Present the results page with image prediction results 
	  presentResults() {
		let resultsModal = this.modalCtrl.create(ResultsPage,  this.resultPreds);
		resultsModal.present();
	  }
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad ImagerecPage');
	};
		
	/**
	 * 
	 * IONIC FUNTION TO USE CAMERA
	 * 
	 */
		takePic(pictureSourceType: any) {
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
			let image = <HTMLImageElement>document.getElementById('selectedImage');
			this.imageToPredict = image;
			// this.loading.present();
			this.predictButtonText = 'Predicting...';
			this.modelLoader.predictImage(this.imageToPredict)
				.then((predictions) => {
					this.resultPreds = this.modelLoader.mapPredictions(predictions);
					this.presentResults();
					this.predictButtonText = 'Predict';
				})
				.catch((error) => {
					console.error('Error: ' + error);
				});
		};
		
}
