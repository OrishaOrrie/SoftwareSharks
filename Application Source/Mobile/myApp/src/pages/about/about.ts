import { FeedbackPage } from './../feedback/feedback';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
//import { Camera } from ‘ionic-native’;


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public viewCtrl : ViewController, public modalCtrl: ModalController) {

  }
  public closeModal(){
    this.viewCtrl.dismiss();
  }

  openBrowserToGithubIssues() {
    window.open('https://github.com/OrishaOrrie/SoftwareSharks/issues/new/choose', '_system', 'location=yes');
    return false;
  }

  openBrowserToPP() {
    window.open('https://www.freeprivacypolicy.com/privacy/view/b0d98055db1daabbf50b21d867461a36', '_system', 'location=yes');
    return false;
  }

  openFeedback() {
    let feedbackPage = this.modalCtrl.create(FeedbackPage);
		feedbackPage.present();
  }
}
