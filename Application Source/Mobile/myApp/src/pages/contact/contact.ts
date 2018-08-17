import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { HttpClient, HttpHandler, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  presentAlert =function() {
    let alert = this.alertController.create({
      title: 'Message sent!',
      subTitle: 'Your message has been sent. A member of our team will get back to you as soon as possible.',
      buttons: ['Dismiss']
    })

    alert.present();

  }
  openModal()
    {
      var data = { message : 'hello world' };
      var homePage = this.modalCtrl.create(AboutPage,data);
      homePage.present();
    }

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
      name: new FormControl(),
      email: new FormControl(),
      message: new FormControl() });

      httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };
    constructor(public navCtrl: NavController, public modalCtrl : ModalController, private http: HttpClient, private alertController: AlertController, private fb: FormBuilder) {
    
        this.myGroup = this.fb.group({  
            'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'email': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
            'message': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

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
      this.presentAlert();
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      
      }
      this.myGroup.reset();
      
      console.log('Name: ' + contactName + ' Email: ' + contactEmail + ' Msg: ' + contactMessage);

      this.http.post('https://us-central1-testproject-ee885.cloudfunctions.net/app/sendmail',
      {'subject': contactName, 'text': contactMessage, 'email': contactEmail}
      ).subscribe(data1 => {
        console.log(data1);
        if (data1 == 'sent') {
          this.submitted = true;
    
        }
      });
    }
}
