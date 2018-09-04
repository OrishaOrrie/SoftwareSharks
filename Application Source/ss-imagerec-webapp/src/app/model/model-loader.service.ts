import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class ModelLoaderService {

  public model: tf.Model = null;

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
        this.model = await tf.loadModel('https://storage.googleapis.com/testproject-ee885.appspot.com/mobilenet_model/model.json');
        // this.model = await tf.loadModel('https://storage.googleapis.com/testproject-ee885.appspot.com/tfjs/model.json');
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
    predictedClass.dispose();
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
}
