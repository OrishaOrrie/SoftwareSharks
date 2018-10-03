import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AlertService } from '../../core/alert/alert.service';
import { AlertType } from '../../shared/models/AlertType';
import { Alert } from '../../shared/models/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService,
    public alertService: AlertService) { }

  ngOnInit() {
  }

  public signOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/');
      this.alertService.add(new Alert(AlertType.Info, 'Goodbye!', 'Successfully Signed Out!'));
    });
  }

}
