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
*  The functionality of the main page that will be seen when a user opens the app.
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

  constructor(public navCtrl: NavController,public modalCtrl : ModalController) {
  		//contactPage = ContactPage;
  }
  openModal()
  {
    var data = { message : 'Welcome!' };
    var homePage = this.modalCtrl.create(AboutPage,data);
    homePage.present();
  }
}
