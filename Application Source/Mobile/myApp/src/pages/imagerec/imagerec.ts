import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ImagerecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagerec',
  templateUrl: 'imagerec.html',
})
export class ImagerecPage {
	myPhoto :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagerecPage');
  }

  takePic(pictureSourceType: any){
		const options: CameraOptions = {
			quality: 95,
			destinationType: this.camera.DestinationType.FILE_URI,
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
			this.myPhoto =  imageData;
		}, (err) => {
			// Handle error
		});
  }
  selectPic(){
		const options: CameraOptions = {
			quality: 100,
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
			this.myPhoto = imageData;
		}, (err) => {
			// Handle error
		});
  }
  

}
