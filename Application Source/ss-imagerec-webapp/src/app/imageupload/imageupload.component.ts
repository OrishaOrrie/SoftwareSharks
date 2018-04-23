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
    this.uppy = Uppy({
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
      console.log('body text', body);
      this.results = [];
      body.forEach(element => {
        this.results.push(new Result(element.id, element.name, element.value));
      });
      this.instruction = 'View Results Below';
      this.showSpinner = false;
    });

  }

  reloadPage() {
    window.location.reload(true);
  }

}
