import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ImageUploaderComponent } from '../imageuploader/imageuploader.component';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
    var y = document.getElementById("imgup");
    y.style.display ="none";
    var yo = document.getElementById("imageimage");
    yo.style.display ="none";
  }
  //showUp :boolean =false;
  
  showupload()
  {
   // this.showUp=true;
    var x = document.getElementById("imgup");
    var z = document.getElementById("imageimage");
      z.style.display = "block";
      x.style.display = "block";
      var y = document.getElementById("mainimage");
      y.style.display = "none";
   }

  showmain()
  {
      var y = document.getElementById("mainimage");
      var z = document.getElementById("imageimage");
      z.style.display ="none";
      y.style.display = "block";
      var x = document.getElementById("imgup");
      x.style.display = "none";
  }

}

