import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { Alert } from '../../shared/models/alert';
import { AlertType } from '../../shared/models/AlertType';

describe('AlertService', () => {
  let service: AlertService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AlertService] });
    service = TestBed.get(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear alerts array', () => {
    service.clear();
    expect(service.alerts.length).toEqual(0);
  });

  it('should append alerts array', () => {
    const currentLength = service.alerts.length;
    service.add(new Alert(AlertType.Info, 'Test Alert'));
    expect(service.alerts.length).toBeGreaterThan(currentLength);
  });

  it('should remove alert from alerts array', () => {
    const alert: Alert = new Alert(AlertType.Info, 'Test Alert');
    service.add(alert);
    const currentLength = service.alerts.length;
    service.removeAlert(alert);
    expect(service.alerts.length).toBeLessThan(currentLength);
  });

});
