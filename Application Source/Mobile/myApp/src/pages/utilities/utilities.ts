import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';

/**
 * Generated class for the UtilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-utilities',
  templateUrl: 'utilities.html',
})
export class UtilitiesPage {
	Math: Math = Math;
	totalObjects : number =null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilitiesPage');
  }
	  single_item = 1;
	  empty_bucket = 1;
    filled_bucket = 1;


    presentAlert =function() {
      let alert = this.alertController.create({
        title: 'Total amount of items',
        subTitle: this.totalObjects,
        buttons: ['Dismiss']
      });
      alert.present();
    }
  hello = function(a: number, b: number, c: number)
  {
   		this.totalObjects = ((b - c)/a);
       //	alert(this.totalObjects);
       this.presentAlert();
   			return this.totalObjects;

   }
   

}
