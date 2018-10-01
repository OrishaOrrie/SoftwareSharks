import { Injectable } from '@angular/core';
import { Alert } from '../../shared/models/alert';

@Injectable()
export class AlertService {
  public alerts: Alert[] = [];
  constructor() { }

  public add(alert: Alert) {
    this.alerts.push(alert);
  }

  public clear() {
    this.alerts = [];
  }

  public removeAlert(alert: Alert) {
    const index = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
