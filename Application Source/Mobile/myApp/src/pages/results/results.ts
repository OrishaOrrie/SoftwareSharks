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
*   Displays results as predicted by the TensorFlowJS model
*/
import { Dialogs } from '@ionic-native/dialogs';
import { Component, Renderer } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModelLoaderProvider } from './../../providers/model-loader/model-loader';
import { QuoteBuilderPage } from '../quote-builder/quote-builder';
import { ToastController } from 'ionic-angular';
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
  constructor(private toastCtrl: ToastController, public renderer: Renderer,public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public viewCtrl: ViewController, public modelLoader : ModelLoaderProvider) {
      this.resultPreds= modelLoader.getResults();
     // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
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


    openQuoteDialog(elName) {
      elName = elName || 'There is no item in store that matches your selection';
      let resultsModal = this.modalCtrl.create(QuoteBuilderPage, {data: elName});
		  resultsModal.present();
    /* this.navCtrl.push(QuoteBuilderPage, {
      data: elName
    });*/
    
    } 


}
