/**
 * File Name:       contact.ts
 * Version Number:  v1.1
 * Author:          Orisha Orrie
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author		Description
 * 20/07/2018   Orisha		Created component
 * 15/08/2018   Orisha    Added backend functionality
 * ------------------------------------------
 * Functional Description:
 *  Provides interface to allow user to contact Bramhope via email
 */

import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { IonicPage, NavParams } from 'ionic-angular';
import { QuotationProvider } from './../../providers/quotation/quotation';
import { Observable } from 'rxjs';
/*
  Generated class for the ModelLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  amount : string;
  resName : string;
  /**
   * Evaluates to true when a server response is received.
   */
  submitted = false;

  /**
   * FormControl used to validate email input
   */
  email = new FormControl('', [Validators.required, Validators.email] );

  /**
   * Determines whether the user's geolocation should be sent with the user query
   */
  sendLocation = true;

  /**
   * Latitude value obtained by the Geolocation module
   */
  positionLat = 0;
  
  /**
   * Longitude value obtained by the Geolocation module
   */
  positionLong = 0;

  public quoteMessage = '';
  /**
   * FormGroup used as a model for form input
   */
  myGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    message: new FormControl()
  });

  /**
   * Upon construction, the form and its validation is initialized. Also gets geolocation data
   * @param navCtrl Controls navigation
   * @param modalCtrl Controls the modal that is presented. Used for the About page modal
   * @param http Provides the service to handle HTTP requests
   * @param alertController Allows for alerts to appear 
   * @param fb Provides the service to build a form
   * @param geolocation Ionic Cordova plugin to natively handle geolocation data
   */
  constructor(public quotationProvider: QuotationProvider ,public navCtrl: NavController, public modalCtrl : ModalController, private http: HttpClient, 
    public alertController: AlertController, private fb: FormBuilder, private geolocation: Geolocation, public navParams: NavParams) {
      
     // this.amount = navParams.get('data');
      //this.resName = navParams.get('resName');
      //this.quotationProvider.attempt();
    this.myGroup = this.fb.group({  
      'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'email': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'message': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.getGeolocation();
  }

  /**
	 * Opens the About modal
	 */
  openModal() {
    var data = { message : 'hello world' };
    var homePage = this.modalCtrl.create(AboutPage,data);
    homePage.present();
    
  }
    
  /**
   * Called upon valid form submission. Obtains values to submit from form, then retrieves geolocation data if specified,
   * and finally posts the data to the email server.
   */
  onSubmit() {
    const contactName = this.myGroup.get('name').value;
    const contactEmail = this.myGroup.get('email').value;
    const contactMessage = this.myGroup.get('message').value;
    this.presentAlert();
    this.myGroup.reset();

    if (this.shouldLocationBeSent() == true) {
      this.getGeolocation();
      let googleAddress: any;
      this.getGoogleAddress(this.positionLat, this.positionLong)
        .then(data => {
          googleAddress = data.results[0].address_components[3].long_name + ', ' + 
            data.results[0].address_components[4].long_name + ', ' + data.results[0].address_components[5].long_name;
           this.postMessage(contactName, contactEmail, contactMessage, googleAddress);
        })
        .catch(error => console.error(error));    
    } else {
      this.postMessage(contactName, contactEmail, contactMessage, 'Undisclosed location');
    }
  }

  /**
   * Alert component that is called upon form submission
   */
  presentAlert() {
    let alert = this.alertController.create({
      title: 'Message sent!',
      subTitle: 'Your message has been sent. A member of our team will get back to you as soon as possible.',
      buttons: ['Dismiss']
    });
  
    alert.present();
  }

  /**
   * Completes the HTTP POST request to the email server with the specified data
   * @param name Name value from form
   * @param email Email value from form
   * @param message Message value from form
   * @param address Address value as determined by getGoogleAddress(), if specified
   */
  postMessage(name, email, message, address) {
    console.log('Name: ' + name + ' Email: ' + email + ' Msg: ' + message + ' Address: ' + address);
    let messageToSend = message + '\nSent from:  ' + address;
    this.http.post('https://us-central1-testproject-ee885.cloudfunctions.net/app/sendmail',
    {'subject': name, 'text': messageToSend, 'email': email}
      ).subscribe(data1 => {
        console.log(data1);
        if (data1 == 'sent') {
          this.submitted = true;
        }
      });
  }

  /**
   * Evaluates to true if the Send Location checkbox is checked in the form
   */
  shouldLocationBeSent() {
    return this.sendLocation;
  }

  /**
   * Uses the Ionic geolocation module to obtain the current longitude and lattitude
   */
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((response) => {
      this.positionLat = response.coords.latitude;
      this.positionLong = response.coords.longitude;
    }).catch((error) => {
      console.error("Error getting geolocation data: " + error);
    });
  }

  /**
   * Makes an API call to Google Maps to get the address from the geolocation data
   * @param lat Current latitude value
   * @param lng Current longitude value
   * @returns A JSON array with various details of the address as returned by the Google Maps API
   */
  getGoogleAddress(lat, lng) {
    const latlng = lat + ',' + lng;
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyD1GI0J6QPOYxqxBMG4Z2oIr-ctibYoRiI')
      .then(
        response => {
          return response.json();
        });
  }
  addQuoteToMessage() {
    const quoteList = this.quotationProvider.getQuoteList();
    this.quoteMessage = '\nI\'d like to receive a quote for the following items:\n';
    this.quoteMessage += '=================\n';
    quoteList.forEach((element, index) => {
      this.quoteMessage += (index + 1) + '. ' + element.name + ' x' + element.amount + '\n';
    });
    this.quoteMessage += '=================\n';

    const messageText = this.myGroup.get('message').value;
    this.myGroup.patchValue({
      message: messageText + this.quoteMessage
    });
  }

  public addQuoteDisplay = new Observable((data) => {
    setInterval(() => {
      data.next(this.quotationProvider.isQuoteStarted());
    }, 1000);
  });

  alertSing()
  {
    let alert = this.alertController.create({
      title: 'Hey There!',
      message:`
      Got a query about one of Brahope's products? Want to request a quote? Send Bramhope a message!`,
      buttons: ['OK']
    });
    alert.present();
  }

}
