import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../node_modules/hover.css/css/hover-min.css'],
  animations: []
})
export class HomeComponent implements OnInit {

  state = false;

  constructor() { }

  ngOnInit() {
  }

}
