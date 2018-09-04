import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  public feedbackTypes: string[] = [
    'General Feedback',
    'Bug',
    'Feature Request'
  ];
  public defaultType = 'General Feedback';
  public sending: Boolean = false;
  public submitted: Boolean = false;
  public failedToSubmit: Boolean = false;
  public formGroup: FormGroup;

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

  ngOnInit() {
  }

  submitForm() {
    this.sending = true;
    console.log('Form Valid!');
    console.log(this.formGroup.controls['name'].value);

    this.postMessage().subscribe(
      (data => {
        console.log(data);
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
