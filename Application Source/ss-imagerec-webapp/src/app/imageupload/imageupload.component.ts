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

  private uppy: IUppy<any, UppyFile<any>>;
  public results: Result[] = [];
  public instruction: String = 'Click Browse, My Device, or Webcam and Select or Capture an Image to Upload';
  public showSpinner = false;

  constructor() { }

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

  madeChange() {
    const uploadedFile = document.querySelector('input');
    const preview = document.querySelector('.preview');
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    if (uploadedFile.files.length === 0) {
      const newP = document.createElement('p');
      newP.textContent = 'No files currently selected';
      preview.appendChild(newP);
    } else {
      const newP = document.createElement('p');
      const fileSize = this.formattedFileSize(uploadedFile.files[0].size);
      newP.textContent = 'File Name: ' + uploadedFile.files[0].name + ' Size: ' + fileSize;
      const image = document.createElement('img');
      image.src = window.URL.createObjectURL(uploadedFile.files[0]);
      image.style.setProperty('height', '200px');
      preview.appendChild(newP);
      preview.appendChild(image);
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

  reloadPage() {
    window.location.reload(true);
  }

}
