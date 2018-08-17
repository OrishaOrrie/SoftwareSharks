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

  private model: any;

  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    console.log('Hello ModelLoaderProvider Provider');
  }

  async loadModel() {	
    try {
      this.model = await tf.loadModel('https://storage.googleapis.com/testproject-ee885.appspot.com/mobilenet_model/model.json');
      console.log('Model is Loaded!');
      // this.modelStatus = 'Model loaded YAS QUEEN';
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

  getModel() {
    return this.model;
  };

}
