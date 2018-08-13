import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilitiesPage');
  }
	  single_item = 1;
	  empty_bucket = 1;
	  filled_bucket = 1;

  hello = function(a: number, b: number, c: number)
  {
   		this.totalObjects = ((b - c)/a);
   			//alert(totalObjects);
   			return this.totalObjects;

   }

}
