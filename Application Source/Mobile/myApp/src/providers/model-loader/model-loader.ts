import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
declare var require: any

/**
 * File Name:       model-loader.ts
 * Version Number:  v1.0
 * Author Name:     Tobias Bester
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * Manual:  Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 21/07/2018   Tobias        Created provider
 * ------------------------------------------
 * Functional Description:
 *  Handles all requests related to image classification and TensorFlow functions
 */

/*
  Generated class for the ModelLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModelLoaderProvider {

  /**
   * Reference to the TensorFlowJS Model instance that is loaded into memory
   */
  private model: tf.Model = null;
  /**
   * Specifies the different models that can be used, including their name, the URL of the Google Storage bucket in which
   * they are called from, the number of classes that it can predict from, and whether the model has catalogue links, as is the
   * case with the Bramhope model. Also includes the classes JSON file with the model's corresponding class labels
   */
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
  /**
   * An array used to store JSON objects related to the classes that were predicted. Includes class name, class likeliness,
   * and class catalogue links, if specified
   */
  public resultPreds = [];
  /**
   * Determines which modelType object is selected to specify which model should be used
   */
  public modelNumber = 1;

  /**
   * 
   * @param http Provides the service to handle HTTP requests
   * @param alertCtrl Controls the alert element
   */
  constructor(private alertCtrl: AlertController) { }

  /**
   * Loads the TensorFlowJS model from the specified URL by using the tf.loadModel. It then warms up the model
   * by predicting on a blank image. This function only loads a model if one has not been loaded already
   */
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

  /**
   * Checks if the model is ready to be used
   * @returns   True if a TensorFlowJS model is loaded into memory. False if not
   */
  modelIsReady() {
    // console.log('Checking modelIsReady');
    if (this.model == null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Performs a set of TensorFlowJS operations that result in a list of predicted classes of an image
   * @param image   HTMLImageElement containing the image to be predicted
   * @returns   A list of predictions where each element is the predicted likeliness of the corresponding model class
   */
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
    return classId;
  }

  /**
   * Called by the predictImage function, this crops the raw image pixel data to a smaller
   * size so that it can be resized later
   * @param img   The raw image pixel data as returned by tf.fromPixels
   * @returns   The raw pixel data of the cropped image
   */
  private cropImage(img) {
    const size = Math.min(img.shape[0], img.shape[1]);
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
  };

  /**
   * A getter for resultPreds. Also processes the prediction results by calling processResultNames()
   */
  getResults() {
    this.processResultNames();
    return this.resultPreds;
  };

  /**
   * Maps the predictions returned from the predictImage function to the corresponding class labels in
   * the classes JSON file. Then the classes are sorted by decreasing likeliness and the classes with a
   * likeliness lower than 0.001% are cut off
   * @param classPreds  tf.Tensor.data  The list of predictions returned by the predictImage function
   * @returns   An array of JSON objects of the model classes and their associated prediction likeliness
   */
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

  /**
   * Called by mapPredictions in order to sort the classes by likeliness
  */
  private sortPreds() {
    this.resultPreds.sort((a, b) => {
      return b.likeliness - a.likeliness;
    });
  }

  /**
   * Checks whether the selected model contains catalogue links
   * @returns   True if the model has links, false if not
   */
  private modelHasLinks() {
    return this.modelType[this.modelNumber].hasLinks;
  }

  /**
   * Formats the class labels to a more readable format and slices off classes with a likeliness lower
   * than 0.001%
   */
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
