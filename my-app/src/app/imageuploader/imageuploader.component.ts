import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.component.html',
  styleUrls: ['./imageuploader.component.css']
})
export class ImageuploaderComponent implements OnInit {

  uploadDesc = 'Click the Upload Image tab to upload and process an image.';

  constructor() { }

  ngOnInit() {
  }

}
