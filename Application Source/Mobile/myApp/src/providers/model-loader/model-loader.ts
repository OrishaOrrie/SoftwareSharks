import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

/*
  Generated class for the ModelLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModelLoaderProvider {

  private model: any = null;
  public resultPreds = [];

  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    console.log('Hello ModelLoaderProvider Provider');
  }

  async loadModel() {	
    try {
      this.model = await tf.loadModel('https://storage.googleapis.com/testproject-ee885.appspot.com/mobilenet_model/model.json');
      console.log('Provider: Model is Loaded!');
      alert('loaded');
      //this.modelStatus = 'Model loaded YAS QUEEN';
    } catch (err) {
      // Handle error
      let prompt = this.alertCtrl.create({
        title: 'Error loading model',
        subTitle: err,
        buttons: ['OK']
      });
      prompt.present();
    }
  };

  modelIsReady() {
    console.log('Checking modelIsReady');
    if (this.model == null) {
      return false;
    } else {
      return true;
    }
  }

  getModel() {
    // if (this.model) {
    //   return this.model;
    // } else {
    //   return false;
    // }
    console.log('Getting model');
    if (this.modelIsReady()) {
      return this.model;
    } else {
      return null;
    }
  };

  getResults()
  {
    return this.resultPreds.slice(0,8);
  };

  predictionsAreReady() {
    console.log('Checking predictionsAreReady');
    if (this.resultPreds.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  setResults(resultPreds)
  {
    this.resultPreds = resultPreds;
  };

}
