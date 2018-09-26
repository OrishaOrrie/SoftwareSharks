import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                public auth: AuthService) { }

  ngOnInit() {
    this.auth.signOut();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.auth.googleLogin().then((value) => {
      // fulfillment
      console.log('Login Success: ' + value)
      this.router.navigateByUrl(this.returnUrl);
    }, (reason) => {
      // rejection
      console.log('Login Failed: ' + reason)
    });
}

}
