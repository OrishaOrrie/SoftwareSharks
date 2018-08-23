import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
//import { Camera } from ‘ionic-native’;


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public viewCtrl : ViewController) {

  }
  public closeModal(){
    this.viewCtrl.dismiss();
  }

  openBrowserToGithubIssues() {
    window.open('https://github.com/OrishaOrrie/SoftwareSharks/issues/new/choose', '_system', 'location=yes');
    return false;
  }
}
