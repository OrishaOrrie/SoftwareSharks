import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModelLoaderProvider } from './../../providers/model-loader/model-loader';
/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 /**
 * File Name:       results.ts
 * Version Number:  v1.0
 * Author Name:     Orisha Orrie
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * Manual:  Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 1/08/2018   Orisha        Created component
 * ------------------------------------------
 * Functional Description:
 *  Displays results as predicted by the TensorFlowJS model
 */

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  /**
   * Array of result objects, which contain the category name, likeliness, and item web links, if specified.
   * This array is used to display the list of results in the page
   */
  public resultPreds = [];

  /**
   * Fetches the resultPreds from the model loader provider
   * @param navCtrl Controls navigation
   * @param navParams Controls parameters passed in during navigation
   * @param viewCtrl Controls the current view
   * @param modelLoader The ModelLoader provider that handles all image classification requests
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modelLoader : ModelLoaderProvider) {
      this.resultPreds= modelLoader.getResults();
  }

  /**
   * @ignore
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

  /**
   * Closes the modal when the back button is pressed
   */
  public closeModal(){
    this.viewCtrl.dismiss();
  }

  /**
   * Opens a link to the Bramhope store for the corresponding item that was pressed
   * @param url Passed in from the item that is clicked. The corresponding URL is stored in the classes JSON file
   */
  openBrowserToBramhope(url) {
    if (url == '') {
      return false;
    }
    window.open(url, '_system', 'location=yes');
    return false;
  }

}
