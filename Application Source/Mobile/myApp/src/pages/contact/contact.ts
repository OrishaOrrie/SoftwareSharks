import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { HttpClient, HttpHandler, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	name: string;
	/**
   * Evaluates to true when a server response is received.
   */
  submitted = false;

  /**
   * FormControl used to validate email input
   */
  email = new FormControl('', [Validators.required, Validators.email] );

  /**
   * FormGroup used as a model for form input
   */
  myGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email] ),
    message: new FormControl('') });

    httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
  constructor(public navCtrl: NavController, private http: HttpClient) {

  }
  getErrorMessage() {
    // console.log('Errrorrrrr');
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  onSubmit() {

    const contactName = this.myGroup.get('name').value;
    const contactEmail = this.myGroup.get('email').value;
    const contactMessage = this.myGroup.get('message').value;

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    console.log('Name: ' + contactName + ' Email: ' + contactEmail + ' Msg: ' + contactMessage);

    this.http.post('https://us-central1-testproject-ee885.cloudfunctions.net/app/sendmail',
    {'subject': contactName, 'text': contactMessage, 'email': contactEmail}
    ).subscribe(data1 => {
      console.log(data1);
      if (data1 === 'sent') {
        this.submitted = true;
      }
    });

  }
}
