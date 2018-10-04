/**
* File Name:       feedback.ts
* Version Number:  v1.1
* Author:          Orisha Orrie, Tobias Bester
* Project Name:    Ninshiki
* Organization:    Software Sharks
* User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
* Update History:
* ------------------------------------------
* Date         Author		Description
* 20/07/2018   Orisha		Created component
* 18/09/2018   Tobias   Fixed layout
* 18/09/2018   Tobias   Created feedback page functionality
* ------------------------------------------
* Functional Description:
*  Functions of the feedback page such as the type of feedback selection as well as form 
* validation
*/

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  submitted = false;
  feedType: string[] = [
    'General Feedback',
    'Bug',
    'Feature Request'
  ];
  defaultFeedType = 'General Feedback';

  myGroup = new FormGroup({
    name: new FormControl(),
    message: new FormControl()
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private fb: FormBuilder, private http: HttpClient, public alertController: AlertController) {

      this.myGroup = this.fb.group({
        'feedType': new FormControl(null),
        'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'message': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.myGroup.controls['feedType'].setValue(this.defaultFeedType, {onlySelf: true});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  /**
   * Presents a model that indicates that the feedback is sent
   */
  presentAlert() {
    let alert = this.alertController.create({
      title: 'Feedback sent!',
      subTitle: 'Thanks, we truly appreciate it!',
      buttons: ['Sure']
    })

    alert.present();
  }

  /**
   * Called when the Send Feedback button is pressed. Sends message and alerts user.
   */
  onSubmit() {
    const senderName = this.myGroup.get('name').value;
    const senderFeedType = this.myGroup.get('feedType').value;
    const senderMessage = this.myGroup.get('message').value;
    this.presentAlert();
    this.myGroup.reset();

    this.postMessage(senderName, senderFeedType, senderMessage);
  }

  /**
   * Uses POST to post the paramters to the server URL indicated
   * @param name The sender's name
   * @param feedType The sender's specified feedback type
   * @param message The sender's message
   */
  postMessage(name, feedType, message) {
    console.log('Name: ' + name + ' Type: ' + feedType + ' Msg: ' + message);
    let messageToSend = 'Feedback type: ' + feedType + '\n' + message;
    this.http.post('https://us-central1-testproject-ee885.cloudfunctions.net/app/sendmail',
    {'subject': name, 'text': messageToSend, 'email': "Email unavailable"}
    ).subscribe(data1 => {
      console.log(data1);
      if (data1 == 'sent') {
        this.submitted = true;
      }
    });
  }

}
