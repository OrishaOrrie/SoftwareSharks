import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AlertService } from '../../core/alert/alert.service';
import { AlertType } from '../../shared/models/AlertType';
import { Alert } from '../../shared/models/alert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public alertService: AlertService) { }

  ngOnInit() {
  }

  public signOut() {
    this.auth.signOut().then(() => {
      this.alertService.add(new Alert(AlertType.Info, 'Goodbye!', 'Successfully Signed Out!'));
    });
  }

}
