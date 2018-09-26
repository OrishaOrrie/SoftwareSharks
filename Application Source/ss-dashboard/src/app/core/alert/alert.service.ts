import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alert } from '../../shared/models/alert';

@Injectable()
export class AlertService {
  public alerts: Alert[] = [];
  constructor() { }

  add(alert: Alert) {
    this.alerts.push(alert);
  }

  clear() {
    this.alerts = [];
  }

  public removeAlert(alert: Alert) {
    const index = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
}

  // getAlerts(): Observable<Alert[]> {
  //   return this.alerts;
  // }
}
