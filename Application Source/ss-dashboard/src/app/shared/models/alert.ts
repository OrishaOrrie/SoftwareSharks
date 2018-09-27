import { AlertType } from './AlertType';

export class Alert {
    public alertParams: object = {
        type: AlertType.Danger,
        strongStart: '',
        message: '',
        strongEnd: ''
    };

    constructor(alertType: AlertType, message: string, strongStart?: string, strongEnd?: string) {
        this.alertParams = {
            type: alertType,
            strongStart: strongStart,
            message: message,
            strongEnd: strongEnd
        };
    }
}
