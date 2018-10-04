/**
 * File Name:       about.ts
 * Version Number:  v1.1
 * Author:          Orisha Orrie, Tobias Bester
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author		Description
 * 20/07/2018   Orisha		Created component
 * 15/08/2018   Tobias		Added functions for feedback
 * ------------------------------------------
 * Functional Description:
 *  This page implements the functionality for the feedback from users on github as well as through mail. 
 * The privacy policy can also be viewed here.
 */

import { FeedbackPage } from './../feedback/feedback';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


/*
  Generated class for the ModelLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  /**
   * @param navCtrl Controls navigation
   * @param viewCtrl Controls the current view
   * @param modalCtrl Controls the modal that is presented. Used for the Feedback page modal
   */
  constructor(public navCtrl: NavController, public viewCtrl : ViewController, public modalCtrl: ModalController) {
  }

  /**
   * Called when the Back button is called
   */
  public closeModal(){
    this.viewCtrl.dismiss();
  }

  /**
   * Opens website in external browser
   */
  openBrowserToGithubIssues() {
    window.open('https://github.com/OrishaOrrie/SoftwareSharks/issues/new/choose', '_system', 'location=yes');
    return false;
  }

  /**
   * Opens website in external browser
   */
  openBrowserToPP() {
    window.open('https://www.freeprivacypolicy.com/privacy/view/b0d98055db1daabbf50b21d867461a36', '_system', 'location=yes');
    return false;
  }

  /**
   * Opens the Feedback page modal
   */
  openFeedback() {
    let feedbackPage = this.modalCtrl.create(FeedbackPage);
		feedbackPage.present();
  }
}
