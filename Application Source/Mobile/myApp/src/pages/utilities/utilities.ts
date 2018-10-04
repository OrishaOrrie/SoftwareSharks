import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
// import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';

/**
 * File Name:       utilities.ts
 * Version Number:  v1.0
 * Author Name:     Orisha Orrie
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * Manual:  Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 21/07/2018   Orisha        Created component
 * ------------------------------------------
 * Functional Description:
 *  Provides ability for user to conduct weight analysis
 */

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
  
  /**
   * An instance of the JavaScript Math class required to use the floor function
   */
  Math: Math = Math;
  
  single_item = 1.0;
  empty_bucket = 2.0;
  filled_bucket = 10.0;
  
  /**
   * Determines what is the resulting weight value to be displayed. Handles invalid input values by returning
   * appropriate validation messages
   * @returns A string value that is displayed in the result card on the page
   */
  hello = (() => {

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

  /**
   * @ignore
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertController: AlertController, public modalCtrl : ModalController) {

  }

  /**
   * Opens the About page modal
   */
  openModal() {
    var data = { message : 'hello world' };
    var homePage = this.modalCtrl.create(AboutPage,data);
    homePage.present();
  }

  /**
   * @ignore
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilitiesPage');
  }  

}
