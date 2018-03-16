import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ImageUploaderComponent } from '../imageuploader/imageuploader.component';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  showMain = true;
  showUpload = false;
  constructor() { }
  
  ngOnInit() {
  
  }


  showupload()
  {
    this.showMain = false;
    this.showUpload = true;
   }

  showmain()
  {
    this.showMain = true;
    this.showUpload = false;
  }
}

