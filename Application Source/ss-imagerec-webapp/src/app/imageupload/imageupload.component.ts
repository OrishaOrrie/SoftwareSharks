/**
 * File Name:       imageupload.component
 * Version Number:  v1.1
 * Author:          Tobias Bester
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 01/03/2018   Tobias        Created component
 * 03/07/2018   Tobias        Added Custom Image Upload Functionality
 * ------------------------------------------
 * Test Cases:      imageupload.component.spec.ts
 * Functional Description:
 *  Provides interface for user to select or capture an image and upload
 *  it to the system server.
 */

/**
 * @ignore
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { style } from '@angular/animations';
import { Result } from './result';
import { Component, OnInit } from '@angular/core';

/**
 * @ignore
 */
const Uppy = require('uppy/lib/core');
const Dashboard = require('uppy/lib/plugins/Dashboard');
const Tus = require('uppy/lib/plugins/Tus');
const GoogleDrive = require('uppy/lib/plugins/GoogleDrive');
const Instagram = require('uppy/lib/plugins/Instagram');
const Webcam = require('uppy/lib/plugins/Webcam');
const XHRUpload = require('uppy/lib/plugins/XHRUpload');

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

  /**
   * Stores the server's http response of image classifications.
   */
  public results: Result[] = [];

  public instruction: String = 'Click either the File Select or Webcam Capture button';
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
   * This constructor is only used to pass an instance of the HttpClient module.
   * @param http  HttpClient instance
   */
  constructor(private http: HttpClient) { }

  /**
   * @hidden
   */
  ngOnInit() {  }

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

      preview.appendChild(newP);

      this.imgAvailable = false;
      this.imageToUpload = null;
      this.updateInstruction();
    } else {
      const newP = document.createElement('p');
      const fileSize = this.formattedFileSize(uploadedFile.files[0].size);
      newP.textContent = 'File Name: ' + uploadedFile.files[0].name + ' Size: ' + fileSize;

      const image = document.createElement('img');
      image.src = window.URL.createObjectURL(uploadedFile.files[0]);
      image.style.setProperty('height', '200px');

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
        this.instruction = 'Click Upload to upload the selected image';
      } else {
        this.instruction = 'Click Capture to take a screenshot and then click Upload to upload the captured image';
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

    // Capture button element
    this.captureButton = document.createElement('button');
    this.captureButton.textContent = 'CAPTURE';
    this.captureButton.style.setProperty('padding', '16px 32px');
    this.captureButton.style.setProperty('border-radius', '3px');
    this.captureButton.style.setProperty('background', 'rgb(255, 255, 255)');

    const br = document.createElement('br');

    // Canvas element that draws screenshot
    this.canvas = document.createElement('canvas');
    this.canvas.style.setProperty('display', 'none');

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
    context3.fillStyle = '#FFF';
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
   * This function is called when the user clicks the Upload button. It handles the process of uploading
   * either a selected file or a captured webcam image.
   */
  uploadImage() {
    console.log('Uploading...');

    if (this.uploadCapture === false) {    // if file select
      if (this.imageToUpload == null) {
        console.log('No image selected');
        this.updateInstruction();
      } else {
        console.log('Uploading selected image file');
        console.log(this.imageToUpload);
        this.httpUploadImage();
      }
    } else {  // else webcam capture
      this.getCapturedImage();
      if (this.imageToUpload == null) {
        this.updateInstruction();
        console.log('Failed to upload webcam capture');
      } else {
        console.log('Uploading webcam capture');
        this.httpUploadImage();
      }
    }
  }

  /**
   * This function carries out the task of sending an Http request (the image) to the server and
   * handling the server response.
   */
  httpUploadImage() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    const dest = 'http://localhost:8000/upload';
    const formData: FormData = new FormData();
    formData.append('file', this.imageToUpload, this.imageToUpload.name);

    this.http.post(dest, formData, httpOptions)
    .subscribe(
      data => {
        console.log('SENT!');
      }
    );
  }

  /**
   * This function is called when the webcam capture option is selected. It converts the image from the
   * dynamically created <img> element to a File type, which is necessary for the Http request.
   */
  getCapturedImage() {
    const blobToUpload = this.dataURIToBlob(this.image.src);
    let fileFromBlob: any = blobToUpload;
    fileFromBlob.lastModfiedData = new Date();
    fileFromBlob.name = 'webcam_capture';
    fileFromBlob = <File>fileFromBlob;
    console.log(fileFromBlob);
    this.imageToUpload = fileFromBlob;
  }

  /**
   * This function converts the image URI from the <img> element to a Blob type so that it can be converted to
   * a File type.
  */
  dataURIToBlob(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = (dataURI.split(',')[1]);
    }

    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  /**
   * This function reloads the page when the Upload Another Image button is clicked.
   */
  reloadPage() {
    window.location.reload(true);
  }

}
