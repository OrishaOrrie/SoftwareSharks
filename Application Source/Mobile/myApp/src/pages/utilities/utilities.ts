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
  single_item = 1;
  empty_bucket = 2;
  filled_bucket = 10;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertController: AlertController, public modalCtrl : ModalController) {
      

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

  // errorAlert =function() {
  //   let erralert = this.alertController.create({
  //     title: 'Message sent!',
  //     subTitle: 'Your message has been sent. A member of our team will get back to you as soon as possible.',
  //     buttons: ['Dismiss']
  //   })
  // }

    presentAlert =function() {
      let alert = this.alertController.create({
        title: 'Total amount of items',
        subTitle: this.totalObjects,
        buttons: ['Dismiss']
      });
      alert.present();
    }

    //single filed empty
  hello = function(sing: number, emp: number, fil: number)
  {
  
      while(emp>=fil && sing>=fil)
      {
        return 0;
      }
      if(!sing || !emp || !fil)
      {
        return 0;
      }
      this.totalObjects = ((fil - emp)/sing);
      return this.totalObjects;
       

   }
   

}
