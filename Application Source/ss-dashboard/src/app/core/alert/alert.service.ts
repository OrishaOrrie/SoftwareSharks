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

  // getAlerts(): Observable<Alert[]> {
  //   return this.alerts;
  // }
}
