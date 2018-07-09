import { HttpClient, HttpHeaders } from '@angular/common/http';
import { style } from '@angular/animations';
/* File Name: imageupload.component
Version Number: v1.0
Author Name: Tobias Bester
Project Name: Ninshiki
Organization: Software Sharks
Requirements: Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
Update History:
----–––-––-–––---––––---––––--–––---––––-
Date––––Author––––Description–––––––––
01/03/2018 - Tobias - Created ImageUpload
----–––-––-–––---––––---––––--–––---––––-
Test Cases: imageupload.component.spec.ts
Functional Description: Allows user to upload image and receive classification of object in image */

import { Result } from './result';
import { IUppy, UppyFile } from 'uppy-store-ngrx';
import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';

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

  // private uppy: IUppy<any, UppyFile<any>>;
  public results: Result[] = [];
  public instruction: String = 'Click Browse, My Device, or Webcam and Select or Capture an Image to Upload';
  public showSpinner = false;
  public streaming = false;
  public video = null;
  public canvas = null;
  public image = null;
  public captureButton = null;
  public imageToUpload: File = null;
  public uploadCapture = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    /* this.uppy = Uppy({
      autoProceed: false,
      debug: true,
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      }
    })
    .use(Dashboard, {
      target: '.dashboardContainer',
      inline: true,
      maxWidth: 1200,
      maxHeight: 800,
      replaceTargetContent: true,
      showProgressDetails: true,
      note: 'Images only and one file only'
    })
    /*.use(GoogleDrive, { target: Dashboard, host: 'https://server.uppy.io'})
    .use(Instagram, { target: Dashboard, host: 'https://server.uppy.io'})*/
    /*
    .use(Webcam, {target: Dashboard})
    .use(XHRUpload, {endpoint: 'http://127.0.0.1:8000/upload', method: 'post', fieldName: 'file'} )
    .run();

    this.uppy.on('complete', (result) => {
      // console.log('failed files: ', result.failed);
      // console.log('successful files: ', result.successful.response);
      // console.log(this.uppy.getFile(result).response);
    });

    this.uppy.on('upload', (file) => {
      this.showSpinner = true;
    });

    this.uppy.on('file-added', (file) => {
      this.uppy.setFileMeta(file.id, {
        size: file.size
      });
    });

    this.uppy.on('upload-success', (file, body) => {
      /*console.log('full result text', file);*/
      /*
      console.log('body text', body);
      this.results = [];
      body.forEach(element => {
        this.results.push(new Result(element.id, element.name, element.value));
      });
      this.instruction = 'View Results Below';
      this.showSpinner = false;
    });*/

  }

  madeChange(event) {
    const uploadedFile = document.querySelector('input');
    const preview = document.querySelector('.preview');

    this.uploadCapture = false;
    this.imageToUpload = null;
    this.streaming = false;

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    if (uploadedFile.files.length === 0) {
      const newP = document.createElement('p');
      newP.textContent = 'No files currently selected';

      preview.appendChild(newP);

      this.imageToUpload = null;
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
      this.imageToUpload = uploadedFile.files[0];
    }

  }

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

  captureImage() {
    const preview = document.querySelector('.preview');

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

    // this.captureButton.onclick = this.saveCapture;

    preview.appendChild(this.video);
    preview.appendChild(this.canvas);
    preview.appendChild(this.image);
    preview.appendChild(br);
    preview.appendChild(this.captureButton);

  }

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

  clearPhoto(canvas, image) {
    const context3 = canvas.getContext('2d');
    context3.fillStyle = '#FFF';
    context3.fillRect(0, 0, canvas.width, canvas.height);

    const dataF = canvas.toDataURL('image/png');
    image.setAttribute('src', dataF);
  }

  hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  uploadImage() {
    console.log('Uploading...');

    if (this.uploadCapture === false) {    // if file select
      if (this.imageToUpload == null) {
        console.log('No image selected');
      } else {
        console.log('Uploading selected image file');
        console.log(this.imageToUpload);
        this.httpUploadImage();
      }
    } else {  // else webcam capture
      this.getCapturedImage();
      if (this.imageToUpload == null) {
        console.log('Failed to upload webcam capture');
      } else {
        console.log('Uploading webcam capture');
        this.httpUploadImage();
      }
    }
  }

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

  getCapturedImage() {
    const blobToUpload = this.dataURIToBlob(this.image.src);
    let fileFromBlob: any = blobToUpload;
    fileFromBlob.lastModfiedData = new Date();
    fileFromBlob.name = 'webcam_capture';
    fileFromBlob = <File>fileFromBlob;
    console.log(fileFromBlob);
    this.imageToUpload = fileFromBlob;
  }

  dataURIToBlob(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  reloadPage() {
    window.location.reload(true);
  }

}
