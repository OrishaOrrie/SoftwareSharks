/* File Name: contact-us.component
Version Number: v1.0
Author Name: Orisha Orrie
Project Name: Ninshiki
Organization: Software Sharks
Requirements: Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
Update History:
----–––-––-–––---––––---––––--–––---––––-
Date––––Author––––Description–––––––––
01/03/2018 - Orisha - Created ContactUs
----–––-––-–––---––––---––––--–––---––––-
Test Cases: contact-us.component.spec.ts
Functional Description: Allows user to send query to client via email. */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHandler, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  submitted = false;
  // name = '';
  // email = '';
  // message = '';
  email = new FormControl('', [Validators.required, Validators.email] );

  myGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email] ),
    message: new FormControl('')
  });

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

    this.http.post('http://localhost:3000/send',
    {'subject': contactName, 'text': contactMessage, 'email': contactEmail}
    ).subscribe(data1 => {
      console.log(data1);
      if (data1 === 'sent') {
        this.submitted = true;
      }
    }
      /*
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('CS error occured');
      } else {
        console.log('SS error occured');
      }
    }*/ );

  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
