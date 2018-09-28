import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-dash-side-nav',
  templateUrl: './dash-side-nav.component.html',
  styleUrls: ['./dash-side-nav.component.scss']
})
export class DashSideNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    feather.replace();
  }

}
