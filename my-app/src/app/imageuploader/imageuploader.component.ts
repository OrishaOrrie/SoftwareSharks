import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

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
}