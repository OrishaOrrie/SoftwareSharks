import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../../shared/models/AlertType';
import { AlertService } from '../../core/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input()
  public type: string = AlertType.Primary;
  
  @Input()
  public message: string = "";

  @Input()
  public strongStart: string = "";

  @Input()
  public strongEnd: string = "";

  constructor(public alertService: AlertService) { }

  ngOnInit() {
  }

  public getType(): string {
    return this.type as string;
  }

}

