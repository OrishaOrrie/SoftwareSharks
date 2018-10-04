import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
// import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';
//import {ContactPage} from '../contact/contact';

/**
 * File Name:       home.ts
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
 *  Serves as a facade for the application
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
   * @ignore
   */
  constructor(public navCtrl: NavController,public modalCtrl : ModalController) {
  }

  /**
   * Opens the About modal page
   */
  openModal() {
    var data = { message : 'hello world' };
    var homePage = this.modalCtrl.create(AboutPage,data);
    homePage.present();
  }
}
