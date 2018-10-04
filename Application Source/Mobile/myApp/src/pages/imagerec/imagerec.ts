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
 * 15/08/2018   Tobias		Added Custom Image Upload Functionality
 * 15/08/2018	Tobias		Added backend for image recognition			
 * ------------------------------------------
 * Functional Description:
 *  Provides interface for user to select or capture an image and submit it for prediction.
 */
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ModalController } from 'ionic-angular';
import { ModelLoaderProvider } from './../../providers/model-loader/model-loader';
// import { AngularFireStorage } from '../../../node_modules/angularfire2/storage';
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
export class ImagerecPage {
	@ViewChild('content') content:any;
		
	/**
	 * Evaulates to true either when an image has been selected or an image has been captured, else false.
	 * If true, then the predict button is displayed
	 */
	public imgAvailable = false;
	/**
	 * Evaluates to true at the same time as imgAvailable, but is false if an action is canceled.
	 * If true, then the selected image is displayed.
	 */
	public imgSelectedOrCaptured = false;
	/**
	 * An array of Result objects, which are obtained from the predict function and passed to the Results page
	 */
	public resultPreds = [];
	/**
	 * Stores the src of the Image Element that is displayed on the page and sent to be predicted on.
	 * Initially stores a default image.
	 */
	public myPhoto= "assets/imgs/camera-holder.png";
	/**
	 * Stores the Image Element that is displayed and is predicted on. It's src value is that of myPhoto
	 */
	public imageToPredict: HTMLImageElement;
	/**
	 * Specifies the text that appears on the Predict button. Changes according to context
	 */
	public predictButtonText = 'Loading...';
	/**
	 * If true, then the predict button is disabled. Becomes false when the model has been loaded into memory
	 */
	public notReadyToPredict = true;
	/**
	 * A Loader element that is supposed to be displayed during the prediction process, but is not currently in use
	 */
	public loading = this.loadingController.create({
		spinner: 'crescent',
		content: 'Making a Prediction...',
		dismissOnPageChange: true
	});
		
	/**
	 * 
     * @param navCtrl Controls navigation
	 * @param modalCtrl Controls the modal that is presented. Used for the Results page modal
	 * @param navParams Controls parameters passed in during navigation
	 * @param alertCtrl Controls the alert element
	 * @param camera Provides functionality for capturing an image with the native camera
	 * @param loadingController Controls the loader element
	 * @param modelLoader The ModelLoader provider that handles all image classification requests
	 */
	constructor( public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private alertCtrl: AlertController,
		private camera: Camera, public loadingController: LoadingController, public modelLoader: ModelLoaderProvider ) {
		
		// Carries out the code below every 500ms
		let modelLoaded = setInterval(() => {
			if (this.modelLoader.modelIsReady()) {
				// console.log('Model Ready');
				this.predictButtonText = 'Predict';
				this.notReadyToPredict = false;
				clearInterval(modelLoaded);
			} else {
				// console.log('Not Ready');			
			}
		},500);
	}
		
	/**
	 * Opens the About modal
	 */
	openModal() {
		var data = { message : 'hello world' };
		var homePage = this.modalCtrl.create(AboutPage,data);
		homePage.present();
	}

	/**
	 * @ignore
	 */
	ngOnInit() { }

	/**
	 * Opens the Results modal and passes it resultPreds
	 */
	presentResults() {
		let resultsModal = this.modalCtrl.create(ResultsPage,  this.resultPreds);
		resultsModal.present();
	}
	
	/**
	 * @ignore
	 */
	ionViewDidLoad() {
		console.log('ionViewDidLoad ImagerecPage');
	};

	/**
	 * Handles the native process of opening up the camera, accepting the captured image, and displaying it on the page.
	 * Also handles errors from the camera process. 
	 */
	takePic() {
		/**
		 * Config options for the native Ionic camera component
		 */
		const options: CameraOptions = {
			quality: 95,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			saveToPhotoAlbum: true,
			allowEdit: true,
			targetWidth: 300,
			targetHeight: 300
		}

		this.camera.getPicture(options).then((imageData) => {
			this.myPhoto = 'data:image/jpeg;base64,' + imageData;
			this.content.scrollToBottom(1000);
			let image = <HTMLImageElement>document.getElementById('selectedImage');
			this.imageToPredict = image;
			this.imgSelectedOrCaptured = true;
		}, (err) => {
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

	/**
	 * Handles the native process of opening the gallery, accepting the selected image, cropping the image, and displaying it on the page.
	 * Also handles errors from the gallery process.
	 */
  	selectPic() {
		  /**
		 * Config options for the native Ionic camera component
		 */
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			saveToPhotoAlbum: false,
			allowEdit: true,
			targetWidth: 300,
			targetHeight: 300
		}

		this.camera.getPicture(options).then((imageData) => {
			this.myPhoto = 'data:image/jpeg;base64,' + imageData;
			this.content.scrollToBottom(1000);
			let image = <HTMLImageElement>document.getElementById('selectedImage');
			this.imageToPredict = image;
			this.imgSelectedOrCaptured = true;
		}, (err) => {
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
	 * Called when the Predict button is clicked. It passes the ImageElement to the ModelLoader provider.
	 * Once it receives predictions for the image, it map the predictions to resultPreds and presents the results via the Results modal
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
