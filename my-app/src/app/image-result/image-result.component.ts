import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.css']
})
export class ImageResultComponent implements OnInit {

  imgProcessed = "assets/images/loading.gif";
  imgText = "Loading...";

  //Note: Call Process() after image has been uploaded?
  Process(){
    //TODO: Implement image process

    //Define location of the processed Image file
    this.imgProcessed = "assets/images/quack.png"; //Temporary
    this.imgText = "This is a rubber duck."; //Temporary
  }
  
  constructor() { }

  ngOnInit() {
  }

}
