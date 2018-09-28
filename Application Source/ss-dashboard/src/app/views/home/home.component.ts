import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // TypedJS Variable Setup
  typed: any;
  typed_options = {
    strings: ['Powerful.', 'Productive.', 'Intelligent.'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1000,
    showCursor: false,
    loop: true,
    loopCount: Infinity
  };

  constructor() { }

  ngOnInit() {
    this.typed = new Typed('.adjective', this.typed_options);
  }

}
