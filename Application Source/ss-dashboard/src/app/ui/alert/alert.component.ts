import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../../shared/models/AlertType';
import { AlertService } from '../../core/alert/alert.service';
import { Alert } from '../../shared/models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private _alert: Alert;

  public get alert(): Alert {
    return this._alert;
  }

  public set alert(value: Alert) {
    this._alert = value;
  }

  @Input()
  public type = AlertType.Primary;

  @Input()
  public message = '';

  @Input()
  public strongStart = '';

  @Input()
  public strongEnd = '';

  constructor(public alertService: AlertService) { }

  ngOnInit() {
    // alertType: AlertType, message: string, strongStart?: string, strongEnd?: string
    this._alert = new Alert(this.type, this.message, this.strongStart, this.strongEnd);
    // this.alertService.add(this._alert);
  }

  public getType(): string {
    return this.type as string;
  }

  // public newAlert(type: AlertType, message: string, strongStart?: string, strongEnd?: string) {
  //   const alert = new Alert(type, message, strongStart, strongEnd);
  //   // this._alert = alert;
  //   this.alertService.add(alert);
  // }

}
