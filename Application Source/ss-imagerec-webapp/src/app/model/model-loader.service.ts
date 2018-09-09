import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class ModelLoaderService {

  public model: tf.Model = null;
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
    }
  ];
  public resultPreds = [];
  public modelNumber = 1;

  constructor() {
    if (this.modelIsReady() === true) {
      console.log('Service has model ready');
    } else {
      console.log('Service is stil loading model');
    }
  }

  async loadModel() {
    if (this.modelIsReady()) {
      console.log('Model is already loaded');
    } else {
      try {
        this.model = await tf.loadModel(this.modelType[this.modelNumber].url);
        // Warm up model
        (this.model.predict(tf.zeros([1, 224, 224, 3])) as tf.Tensor<tf.Rank>).dispose();
        console.log('Model Loaded from service!');
      } catch (err) {
        console.error('Error obtained: ' + err);
      }
    }
  }

  modelIsReady() {
    console.log('Checking if the model is ready');
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
      console.log( 'Resizing Image...' );
      const resized = tf.image.resizeBilinear(cropped, [229, 229]);
      const batchedImage = resized.expandDims(0);
      const img = batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      console.log( 'Making actual prediction...' );
      const predictions = (this.model.predict(img) as tf.Tensor);
      return predictions;
    });

    const classId = (await predictedClass.data());
    // predictedClass.dispose();
    return classId;
  }

  cropImage(img) {
    const size = Math.min(img.shape[0], img.shape[1]);
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
  }

  mapPredictions(classPreds) {
    console.log('Mapping predictions...');
    const classesJson = require(`../../assets/classes/${this.modelType[this.modelNumber].classJson}`);
    // const numClasses = this.modelType[1].numClasses;
    const numClasses = classPreds.length;
    this.resultPreds = [];
    const linkExists = this.modelHasLinks();

    for (let i = 0; i < numClasses; i++) {
      this.resultPreds[i] = {};
      this.resultPreds[i].id = classesJson.classes[i].id;
      this.resultPreds[i].first = classesJson.classes[i].first;
      this.resultPreds[i].name = classesJson.classes[i].name;
      this.resultPreds[i].likeliness = (classPreds[i] * 100).toFixed(4);
      if (linkExists) {
        this.resultPreds[i].link = classesJson.classes[i].link;
      }
    }

    this.sortPreds();
    this.processResultNames();
    return this.resultPreds;
  }

  sortPreds() {
    this.resultPreds.sort(function(a, b) {
      return b.likeliness - a.likeliness;
    });
  }

  modelHasLinks() {
    return this.modelType[this.modelNumber].hasLinks;
  }

  processResultNames() {
    this.resultPreds.forEach((element, index) => {
      element.name = element.name.replace(/_/g, ' ');
      element.name = element.name.charAt(0).toUpperCase() + element.name.slice(1);

      if (element.likeliness < 0.001) {
        this.resultPreds = this.resultPreds.slice(0, index);
        console.log('Removed element');
      }
    });
  }

}
