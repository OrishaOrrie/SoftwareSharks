import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';
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

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController: AlertController,public modalCtrl : ModalController) {

  }

  openModal()
  {
    var data = { message : 'hello world' };
    var homePage = this.modalCtrl.create(AboutPage,data);
    homePage.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilitiesPage');
  }

  errorAlert =function() {
    let erralert = this.alertController.create({
      title: 'Message sent!',
      subTitle: 'Your message has been sent. A member of our team will get back to you as soon as possible.',
      buttons: ['Dismiss']
    })
  }

    presentAlert =function() {
      let alert = this.alertController.create({
        title: 'Total amount of items',
        subTitle: this.totalObjects,
        buttons: ['Dismiss']
      });
      alert.present();
    }
    //single filed empty
  hello = function(a: number, b: number, c: number)
  {
  

      this.totalObjects = ((b - c)/a);
      //	alert(this.totalObjects);
      this.presentAlert();
      return this.totalObjects;

   }
   

}
