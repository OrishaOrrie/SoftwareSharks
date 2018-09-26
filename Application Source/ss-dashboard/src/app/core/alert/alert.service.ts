import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../../shared/models/alert';

@Injectable()
export class AlertService {
  private alerts: Observable<Alert[]>;
  constructor() { }
}
