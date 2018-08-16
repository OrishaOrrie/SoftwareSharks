import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
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
    var data = { message : 'hello world' };
    var homePage = this.modalCtrl.create(AboutPage,data);
    homePage.present();
  }
}
