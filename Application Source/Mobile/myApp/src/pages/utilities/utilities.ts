 /**
* File Name:       utilities.scss
* Version Number:  v1.1
* Author:          Tobias Bester, Orisha Orrie
* Project Name:    Ninshiki
* Organization:    Software Sharks
* User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
* Update History:
* ------------------------------------------
* Date         Author		Description
* 20/07/2018   Orisha		Created component
* 18/09/2018   Orisha	    Fixed layout
* 18/09/2018   Orisha   Functionality added
* 01/10/2018   Tobias   Validation errors fixed
* ------------------------------------------
* Functional Description:
*  The functions of the page to calculate the amount of items in a box. 
*  Values are validated and calculated here
*/

import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
// import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';
/**
 * Generated class for the UtilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
      
@Component({
  selector: 'page-utilities',
  templateUrl: 'utilities.html',
})

export class UtilitiesPage {
	Math: Math = Math;
	totalObjects : number =null;
  single_item = 1.0;
  empty_bucket = 2.0;
  filled_bucket = 10.0;
  
  hello = (() => {
//validation for values
    if (!this.empty_bucket || !this.filled_bucket || !this.single_item) {
        return 'Weight inputs cannot be empty';
      }

    if (this.empty_bucket <= 0 || this.filled_bucket <= 0 || this.single_item <= 0 ) {
        return 'Weight value must be a positive value';
    }

    if (this.single_item - this.filled_bucket > 0) {
      return 'Single item cannot weigh more than a filled bucket';
    }

    if (this.empty_bucket - this.filled_bucket >= 0) {
      return 'Empty bucket cannot weigh more than a filled bucket';
    }

    return 'Number of items: ' + Math.floor((this.filled_bucket - this.empty_bucket) / this.single_item);

  });

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertController: AlertController, public modalCtrl : ModalController) {
      

  }

  openModal()
  {
    var data = { message : 'Welcome!' };
    var homePage = this.modalCtrl.create(AboutPage,data);
    homePage.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilitiesPage');
  }


    //single filed empty
  
   

}
