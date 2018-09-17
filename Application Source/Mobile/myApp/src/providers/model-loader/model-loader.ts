import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
declare var require: any
/*
  Generated class for the ModelLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModelLoaderProvider {

  private model: any = null;
  public modelType = [{
    'name': 'bramhope',
      'url': 'https://storage.googleapis.com/testproject-ee885.appspot.com/mobilenet_model/model.json',
      'classJson': 'classes.json',
      'numClasses': 57,
      'hasLinks': false
    },
    {
      'name': 'bramhope',
      'url': 'https://storage.googleapis.com/testproject-ee885.appspot.com/bramhope_mobilenet_model/model.json',
      'classJson': 'bramhope_classes.json',
      'numClasses': 53,
      'hasLinks': true
    },
    {
      'name': 'imagenet',
      'url': 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json',
      'classJson': 'imagenet_classes.json',
      'numClasses': 1000,
      'hasLinks': false
  }];
  public resultPreds = [];
  public modelNumber = 1;

  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    console.log('Hello ModelLoaderProvider Provider');
  }

  async loadModel() {
    if (this.modelIsReady()) {
      console.log('Model is already loaded');
    } else {
      try {
        this.model = await tf.loadModel(this.modelType[this.modelNumber].url);
        (this.model.predict(tf.zeros([1, 224, 224, 3])) as tf.Tensor<tf.Rank>).dispose();
        console.log('Provider: Model is Loaded!');
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

  async predictImage(image) {
    const predictedClass = tf.tidy(() => {
      const raw = tf.fromPixels(image, 3);
      const cropped = this.cropImage(raw);
      // 224,224 is the required size for the MobileNet model
      const resized = tf.image.resizeBilinear(cropped, [224, 224]);
      const batchedImage = resized.expandDims(0);
      const img = batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      const predictions = (this.model.predict(img) as tf.Tensor);
      return predictions;
    });

    const classId = (await predictedClass.data());
    // predictedClass.dispose();
    return classId;
  }

  private cropImage(img) {
    const size = Math.min(img.shape[0], img.shape[1]);
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
  };

  getResults()
  {
    // return this.resultPreds.slice(0,8);
    this.processResultNames();
    return this.resultPreds;
  };

  predictionsAreReady() {
    console.log('Checking predictionsAreReady');
    if (this.resultPreds.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  mapPredictions(classPreds) {
    console.log('Mapping predictions...');
    const classesJson = require(`./classes/${this.modelType[this.modelNumber].classJson}`);
    const numClasses = classPreds.length;
    this.resultPreds = [];
    const linkExists = this.modelHasLinks();

    for (let i = 0; i < numClasses; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.modelNumber == 2) {
        // Use if the classes json is in the plain format
        this.resultPreds[i] = {};
        this.resultPreds[i].name = classesJson[i];
        this.resultPreds[i].likeliness = (classPreds[i] * 100).toFixed(4);
      } else {
        // Used if the classes json is in the custom format
        this.resultPreds[i] = {};
        this.resultPreds[i].id = classesJson.classes[i].id;
        this.resultPreds[i].first = classesJson.classes[i].first;
        this.resultPreds[i].name = classesJson.classes[i].name;
        this.resultPreds[i].likeliness = (classPreds[i] * 100).toFixed(4);
        if (linkExists) {
          this.resultPreds[i].link = classesJson.classes[i].link;
        }
      }
    }

    this.sortPreds();
    this.processResultNames();
    return this.resultPreds;
  }

  private sortPreds() {
    this.resultPreds.sort((a, b) => {
      return b.likeliness - a.likeliness;
    });
  }

  private modelHasLinks() {
    return this.modelType[this.modelNumber].hasLinks;
  }

  private processResultNames() {
    this.resultPreds.forEach((element, index) => {
      element.name = element.name.replace(/_/g, ' ');
      element.name = element.name.charAt(0).toUpperCase() + element.name.slice(1);

      if (element.likeliness < 0.001) {
        this.resultPreds = this.resultPreds.slice(0, index);
      }
    });
  }

}
