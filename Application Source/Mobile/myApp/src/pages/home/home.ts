/**
* File Name:       home.ts
* Version Number:  v1.1
* Author:          Orisha Orrie
* Project Name:    Ninshiki
* Organization:    Software Sharks
* User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
* Update History:
* ------------------------------------------
* Date         Author		Description
* 20/07/2018   Orisha		Created component
* ------------------------------------------
* Functional Description:
*  Serves as a facade for the application
*/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
// import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';
//import {ContactPage} from '../contact/contact';


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
