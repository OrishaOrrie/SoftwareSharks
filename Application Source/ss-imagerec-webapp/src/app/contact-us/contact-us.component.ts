/**
 * File Name:       contact-us.component
 * Version Number:  v1.0
 * Author Name:     Orisha Orrie
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * Manual:  Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 01/03/2018   Orisha        Created component
 * ------------------------------------------
 * Test Cases:      contact-us.component.spec.ts
 * Functional Description:
 *  Allows user to send email query to client via Http to the server
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  /**
   * Evaluates to true when a server response is received.
   */
  submitted = false;

  /**
   * Determines whether the spinner is to be displayed or not
   */
  showSpinner = false;

  /**
   * Message received from the server. Displayed on the status card
   */
  msgReceived = '';

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
    message: new FormControl('')
  });

  /**
   * This constructor is only used to pass an instance of the HttpClient module.
   * @param http  HttpClient instance
   */
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  /**
   * Called when invalid input is detected
   */
  getErrorMessage() {
    // console.log('Errrorrrrr');
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  /**
   * Called when the Submit button is clicked. POSTs the email, name, and query to the backend server.
   */
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
    this.showSpinner = true;

    this.http.post('https://us-central1-testproject-ee885.cloudfunctions.net/app/sendmail',
    {'subject': contactName, 'text': contactMessage, 'email': contactEmail},
    httpOptions
    ).subscribe(data1 => {
      this.showSpinner = false;
      const msgFromServer = data1['message'];
      this.submitted = true;
      if (msgFromServer === 'Message sent') {
        console.log('Message sent == true');
        this.msgReceived = 'Thank you for contacting us! We\'ll be in touch ;) ';
      } else {
        console.log('Message sent == false');
        this.msgReceived = 'Sorry, your message was not sent. Try again later please if you don\'t mind OwO';
      }
    });

  }

}
