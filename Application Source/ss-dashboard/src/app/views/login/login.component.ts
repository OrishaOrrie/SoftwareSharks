import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { AlertService } from '../../core/alert/alert.service';
import { Alert } from '../../shared/models/alert';
import { AlertType } from '../../shared/models/AlertType';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  user: User;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    public auth: AuthService) { }

  ngOnInit() {
    this.auth.signOut();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.auth.googleLogin().then((firebaseUser) => {
      // fulfillment
      this.user = new User(firebaseUser.uid, firebaseUser.email, firebaseUser.photoURL, firebaseUser.displayName);
      this.alertService.add(new Alert(AlertType.Success, 'Welcome to Ninshiki: ', 'Login Successful!', this.user.displayName));
      this.router.navigateByUrl(this.returnUrl);
    }, (reason) => {
      // rejection
      // console.log('Login Failed: ' + reason);
      this.alertService.add(new Alert(AlertType.Danger, 'Looks like something went wrong!', 'Oh No!', ':('));
    });
  }

}
