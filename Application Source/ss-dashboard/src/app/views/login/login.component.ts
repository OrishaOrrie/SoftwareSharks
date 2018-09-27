import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { AlertService } from '../../core/alert/alert.service';
import { Alert } from '../../shared/models/alert';
import { User } from '../../shared/models/user';
import { AlertType } from '../../shared/models/AlertType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    public auth: AuthService) { }

  ngOnInit() {
    this.auth.signOut();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.auth.googleLogin().then(value => {
      // fulfillment
      console.log('Login Success: ' + value);
      this.alertService.add(new Alert(AlertType.Success, 'Welcome to Ninshiki: ', 'Login Successful!', 'TODO: Add Username'));
      this.router.navigateByUrl(this.returnUrl);
    }, (reason) => {
      // rejection
      console.log('Login Failed: ' + reason);
      this.alertService.add(new Alert(AlertType.Danger, 'Looks like something went wrong!', 'Oh No!', ':('));
    });
  }

}
