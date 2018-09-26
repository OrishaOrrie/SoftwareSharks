import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../../shared/models/AlertType';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  // @Input()
  // public type: string = AlertType.Primary;
  constructor() { }

  ngOnInit() {
    // console.log(this.type);
  }

}

