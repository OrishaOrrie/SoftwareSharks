/**
* File Name:       results.scss
* Version Number:  v1.1
* Author:          Tobias Bester
* Project Name:    Ninshiki
* Organization:    Software Sharks
* User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
* Update History:
* ------------------------------------------
* Date         Author		Description
* 20/07/2018   Tobias		Created component
* 18/09/2018   Tobias	   Fixed layout
* 18/09/2018   Tobias   Added functionality
* ------------------------------------------
* Functional Description:
*  The functionality of the page that will display the results of the image prediction as well as a link to the store and an
*  option to add it to their basket for a quotation
*/

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

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  public resultPreds = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modelLoader : ModelLoaderProvider) {
      console.log('UserId', navParams.get('resultPreds'));
      this.resultPreds= modelLoader.getResults();
      // this.resultPreds = this.formatClassNames(this.resultPreds);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  openBrowserToBramhope(url) {
    if (url == '') {
      return false;
    }
    window.open(url, '_system', 'location=yes');
    return false;
  }

}
