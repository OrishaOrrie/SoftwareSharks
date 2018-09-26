import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AlertService } from '../../core/alert/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, public alertService: AlertService) { }

  ngOnInit() {
  }

}
