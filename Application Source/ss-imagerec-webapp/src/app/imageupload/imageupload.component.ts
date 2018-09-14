/**
 * File Name:       imageupload.component
 * Version Number:  v1.3
 * Author:          Tobias Bester
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 01/03/2018   Tobias        Created component
 * 03/07/2018   Tobias        Added Custom Image Upload Functionality
 * 12/09/2018   Tobias        Added model selection functionality
 * ------------------------------------------
 * Test Cases:      imageupload.component.spec.ts
 * Functional Description:
 *  Provides interface for user to select or capture an image and have the model predict the class of the
 *  object in the image.
 */

/**
 * @ignore
*/
import { Result } from './result';
import { Component, OnInit } from '@angular/core';
import { ModelLoaderService } from '../model/model-loader.service';
// import { AngularFireStorage } from '../../../node_modules/angularfire2/storage';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

  /**
   * Text displayed on the interface indicating what needs to be done
   */
  public instruction: String = 'Click either the File Select or Webcam Capture button';

  /**
   * Determines whether the spinner next to the Submit button should be displayed or not
   */
  public showSpinner = false;

  /**
   * Determines whether the video element should display the current webcam footage
   */
  public streaming = false;

  /**
   * The video, canvas, image, and captureButton variables are used when dynamically creating elements for webcam capture
   */
  public video = null;
  public canvas = null;
  public image = null;
  public captureButton = null;

  /**
   * This variable is a reference to the file that will be uploaded, either selected or captured
   */
  public imageToUpload: File = null;

  /**
   * Determines whether the file to upload was selected from the file explorer or captured via webcam
   */
  public uploadCapture = false;

  /**
   * Determines if an image is available to be uploaded
   */
  public imgAvailable = false;

  /**
   * Stores the server's http response of image classifications.
   */
  public results: Result[] = [];

  /**
   * Determines whether or not the Submit button should be displayed
   */
  public displayUpload: Boolean = false;

  /**
   * Indicates whether the model loader service has loaded a model into memory
   */
  public modelLoaded: Boolean = false;

  /**
   * Stores the results returned by the model loader predict method
   */
  public predictions: any;

  /**
   * An array used to store JSON objects related to the classes that were predicted. Includes class name, class likeliness,
   * and class catalogue links, if specified
   */
  public resultPreds = [];

  /**
   * The header column text displayed in the results table
   */
  public displayedColumns = ['name', 'likeliness', 'link'];

  /**
   * Determines whether a model is ready and whether an image has been predicted
   */
  public notReadyToPredict = true;

  /**
   * The text displayed on the Submit button
   */
  public modelStatus = 'Loading...';

  /**
   * Determines which model is to be used in the model loader service
   */
  public modelNumber = 1;

  /**
   * This constructor is only used to pass an instance of the HttpClient module.
   * @param http  HttpClient instance
   */
  constructor(public ml: ModelLoaderService ) { }

  /**
   * Upon initialization of the component, the model loader service loads the model. It then queries whether
   * the model has been loaded every 500 ms and if it is, it allows predicting to take place. This timed query
   * is due to the asynchronous nature of the TensorFlowJS loadModel method
   */
  ngOnInit() {
    this.ml.loadModel();
    const modelLoaded = setInterval(() => {
      if (this.ml.modelIsReady()) {
        this.notReadyToPredict = false;
        clearInterval(modelLoaded);
        this.modelStatus = 'Submit';
      }
    }, 500);
  }

  /**
   *  This function is triggered by the user selecting an image from the file explorer. It displays the selected
   *  image in the 'preview' element. This image element is added dynamically and is only done if there is an actual
   *  file selected. The selected image is also set as the file to be uploaded.
   */
  madeChange() {
    const uploadedFile = document.querySelector('input');
    const preview = document.querySelector('.preview');

    this.uploadCapture = false;
    this.imageToUpload = null;
    this.streaming = false;
    this.updateInstruction();

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    if (uploadedFile.files.length === 0) {
      const newP = document.createElement('p');
      newP.textContent = 'No files currently selected';
      newP.style.setProperty('color', 'lightgray');

      preview.appendChild(newP);

      this.imgAvailable = false;
      this.imageToUpload = null;
      this.updateInstruction();
    } else {
      const newP = document.createElement('p');
      const fileSize = this.formattedFileSize(uploadedFile.files[0].size);
      newP.textContent = 'Name: ' + uploadedFile.files[0].name + ' Size: ' + fileSize;
      newP.style.setProperty('color', 'lightgray');
      newP.style.setProperty('margin', 'auto');
      newP.style.setProperty('font-family', '"Lato", Arial, Helvetica, sans-serif');

      const image = document.createElement('img');
      image.src = window.URL.createObjectURL(uploadedFile.files[0]);
      image.style.setProperty('height', '200px');
      this.image = image;

      preview.appendChild(newP);
      preview.appendChild(image);

      this.uploadCapture = false;
      this.imgAvailable = true;
      this.imageToUpload = uploadedFile.files[0];
      this.updateInstruction();
    }
  }

  /**
   * This function updates the instruction <p> element to display contextual information.
   */
  updateInstruction() {
    if (this.imgAvailable === false) {
      this.instruction = 'Click either the File Select or Webcam Capture button';
    } else {
      if (this.uploadCapture === false) {
        this.instruction = 'Click Submit to submit the selected image';
      } else {
        this.instruction = 'Click Capture to take a screenshot and then click Submit to submit the captured image';
      }
    }
  }

/**
 * This function formats the size value of the selected file from bytes to a readable string.
 * @param size  This is the size in bytes of the selected file from madeChange().
 * @returns     Returns the size in bytes, KB, or MB depending on the value of size.
 */
  formattedFileSize (size) {
    if (size < 1024) {
      return size + ' bytes';
    }
    if (size < 1024 * 1024) {
      return ( (size / 1024).toFixed(2) + 'KB' );
    }
    if (size > 1024 * 1024) {
      return ( (size / (1024 * 1024)).toFixed(2) + 'MB');
    }

  }

  /**
   * This function handles everything to do with the webcam capture option. It is called when the webcam button is clicked
   * and creates and maintains webcam footage in a video element. Allows the user to capture an image from the webcam
   * recording to upload.
   */
  captureImage() {
    const preview = document.querySelector('.preview');
    this.imgAvailable = false;
    this.displayUpload = false;
    this.updateInstruction();

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    this.imageToUpload = null;
    this.uploadCapture = true;

    // Video element
    this.video = document.createElement('video');
    this.video.textContent = 'Video stream not available';
    this.video.style.setProperty('float', 'left');
    this.video.style.setProperty('text-align', 'center');

    // Capture button element
    this.captureButton = document.createElement('button');
    this.captureButton.textContent = 'CAPTURE';
    this.captureButton.style.setProperty('padding', '16px 32px');
    this.captureButton.style.setProperty('border', '3px lightgray solid');
    this.captureButton.style.setProperty('color', 'lightgray');
    this.captureButton.style.setProperty('background-color', 'rgba(5,5,5,0)');
    this.captureButton.style.setProperty('font-family', '"Lato", Arial, Helvetica, sans-serif');
    this.captureButton.style.setProperty('margin-left', '20px');
    this.captureButton.onmouseover = function() {
      this.style.setProperty('cursor', 'pointer');
      this.style.setProperty('background-color', 'rgb(33, 74, 95)');
    };
    this.captureButton.onmouseleave = function() {
      this.style.setProperty('cursor', 'default');
      this.style.setProperty('background-color', 'rgba(5,5,5,0)');
    };

    const br = document.createElement('br');

    // Canvas element that draws screenshot
    this.canvas = document.createElement('canvas');
    this.canvas.style.setProperty('display', 'none');
    this.canvas.style.setProperty('float', 'right');

    // Image element displaying saved screenshot
    this.image = document.createElement('img');

    this.startup(this.video, this.canvas, this.image, this.captureButton);

    preview.appendChild(this.video);
    preview.appendChild(this.canvas);
    preview.appendChild(this.image);
    preview.appendChild(br);
    preview.appendChild(this.captureButton);

    this.imgAvailable = true;
    this.updateInstruction();
  }

  /**
   * This function carries out the process of displaying the webcam footage and saving captured images.
   * @param video   the video element that displays the webcam footage
   * @param canvas  the canvas element that draws the capture webcam image upon clicking Capture
   * @param image   the image element that displays the image drawn by the canvas
   * @param captureButton   the button element that allows the user to capture the webcam footage
   */
  startup(video, canvas, image, captureButton) {
    const width = 320;
    let height = 0;
    navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log('An error has occured! ' + err);
      });

    video.addEventListener('canplay', function(ev) {
      if (!this.streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        this.streaming = true;
      }
    }, false);

    captureButton.onclick = function() {
      const context = canvas.getContext('2d');
      let data = null;
      if (width && height) {
        this.uploadCapture = true;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        data = canvas.toDataURL('image/png');
        image.src = data;

      } else {
        // this.clearPhoto(canvas, image);
      }
    };

    this.clearPhoto(canvas, image);
  }

  /**
   * This function makes the canvas white if no image has been captured yet.
   * @param canvas Same as the startup function
   * @param image Same as the startup function
   */
  clearPhoto(canvas, image) {
    const context3 = canvas.getContext('2d');
    context3.fillStyle = 'rgb(207, 207, 207)';
    context3.fillRect(0, 0, canvas.width, canvas.height);

    const dataF = canvas.toDataURL('image/png');
    image.setAttribute('src', dataF);

    this.imgAvailable = false;
  }

  /**
   * This function is required for the browser to make use of the device's webcam.
   */
  hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  /**
   * Called when the Submit button is clicked. Calls the model loader service's predictImage method,
   * then maps the predictions and fills the resultPreds array, so that the results table is updated
   */
  predictImage() {

    // Spinner is not displayed due to async issues or not being able to figure it out
    const updateStatus = (txt) => {
      this.modelStatus = txt;
      this.showSpinner = true;
    };

    updateStatus('Predicting...');
    this.ml.predictImage(this.image)
    .then((predictions) => {
      this.showSpinner = false;
      this.resultPreds = this.ml.mapPredictions(predictions);
      this.modelStatus = 'Submit';

      const el = document.querySelector('.result-card');
      el.scrollIntoView({behavior: 'smooth'});
    })
    .catch((error) => {
      console.error('Error: ' + error);
      this.showSpinner = false;
    });

  }

  /**
   * Called when the select element is changed. The model loader service methods are called to change the
   * selected model and load it into memory
   */
  changeSelectedModel() {
    this.ml.changeModel(this.modelNumber);
    this.notReadyToPredict = true;
    this.modelStatus = 'Loading...';
    this.ml.loadModel();
    const modelLoaded = setInterval(() => {
      if (this.ml.modelIsReady()) {
        this.notReadyToPredict = false;
        clearInterval(modelLoaded);
        this.modelStatus = 'Submit';
      }
    }, 500);
  }

  /**
   * This function scrolls up to the Image Submit section of the page
   */
  async reloadPage() {
    const el = document.querySelector('.upload-card__instruction');
    el.scrollIntoView({behavior: 'smooth'});
  }

}
