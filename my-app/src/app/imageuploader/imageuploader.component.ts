import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.component.html',
  styleUrls: ['./imageuploader.component.css'],
})
export class ImageUploaderComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private http : HttpClient){

  }

  urlRoot: String = "https://reqres.in/api/users/2'";
  fileToUpload : File = null;

  /*Choice#2*/
 /* handleFileInput(files:FileList) {
    console.log("POST");
    this.fileToUpload = files.item(0);
    let url = `${this.apiRoot}/post`;
    this.http.post(url, 
      {moo:"foo",goo:"loo"}).subscribe(
        (val) => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error",response);
        });
  }*/

  /*Choice#1*/
  handleImageInput(files:FileList) {
    console.log("POST");

    var headers = new HttpHeaders();
    headers.append("Authoriztion", 'Token asdasd');

    //Change DESTINATION here
    let url = "https://reqres.in/api/users/5";
    this.fileToUpload = files.item(0);

    const formData : FormData = new FormData();
    formData.append('imgForm', this.fileToUpload, this.fileToUpload.name);

    this.http.post(url, 
        {formData,
        "Image Sent":this.fileToUpload.name},
         { headers : headers}).subscribe(
        (val) => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error",response);
        });
  }

}