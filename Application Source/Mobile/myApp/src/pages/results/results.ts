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

  // formatClassNames(preds) {
  //   let p: any;
  //   for (p in preds) {
  //     let ps: String = p.name;
  //     p.name.replace('_', ' ');
  //     p.name = p.name.charAt(0).toUpperCase() + p.name.slice(1);
  //   }
  //   return preds;
  // }

}
