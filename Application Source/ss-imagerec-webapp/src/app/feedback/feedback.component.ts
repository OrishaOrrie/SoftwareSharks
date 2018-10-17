/**
 * File Name:       feedback.component
 * Version Number:  v1.0
 * Author Name:     Tobias Bester
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * Manual:  Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 01/09/2018   Tobias        Created component
 * ------------------------------------------
 * Test Cases:      feedback.component.spec.ts
 * Functional Description:
 *  Allows user to send feedback to developers
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  /**
   * Array of all types of feedback
   */
  public feedbackTypes: string[] = [
    'General Feedback',
    'Bug',
    'Feature Request'
  ];

  /**
   * The default feedback type to be used
   */
  public defaultType = 'General Feedback';

  /**
   * Indicates that the feedback is being sent
   */
  public sending: Boolean = false;

  /**
   * Indicates that a response has been received from the server
   */
  public submitted: Boolean = false;

  /**
   * Indicates that an error occured while trying to submit feedback
   */
  public failedToSubmit: Boolean = false;

  /**
   * Used for form controls and validation
   */
  public formGroup: FormGroup;

  /**
   * THe form group and it's validation is defined in this constructor
   * @param fb Form Builder injection used for Form validation
   * @param http HttpClient injection used to make HTTP requests
   */
  constructor(public fb: FormBuilder, public http: HttpClient) {
    this.formGroup = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(3),
        Validators.required
      ])),
      feedType: new FormControl(null),
      message: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(200)
      ]))
    });
    this.formGroup.controls['feedType'].setValue(this.defaultType, {onlySelf: true});
  }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * Called when the Send Feedback button is clicked. POSTs the message and handles the server
   * response
   */
  submitForm() {
    this.sending = true;

    this.postMessage().subscribe(
      (data => {
        if (data['message'] === 'Message sent') {
          this.submitted = true;
        } else {
          this.failedToSubmit = true;
        }
        this.sending = false;
      })
    );
    // this.formGroup.reset();

  }

  /**
   * Handles sending the HTTP POST request to the email server with the necessary feedback details
   * @returns   Observable with the data received by the email server
   */
  postMessage() {
    const msgToSend = 'Feedback type: ' + this.formGroup.controls['feedType'].value + '\n'
    + this.formGroup.controls['message'].value;

    return this.http.post('https://us-central1-testproject-ee885.cloudfunctions.net/app/sendmail',
      {
        'subject': this.formGroup.controls['name'].value,
        'text': msgToSend,
        'email': 'Email Unavailable',
      }
    );
  }

}
