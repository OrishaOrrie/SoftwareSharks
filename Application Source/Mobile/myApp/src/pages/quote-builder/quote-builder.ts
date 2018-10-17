import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ViewController } from 'ionic-angular';
// import { ContactPage } from '../contact/contact';
import {QuotationProvider} from './../../providers/quotation/quotation';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the QuoteBuilderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quote-builder',
  templateUrl: 'quote-builder.html',
})
export class QuoteBuilderPage {

  DataArray: Array<string> = [];
  amount : number;
  name : string;
  myGroup = new FormGroup({
    amount: new FormControl()
  });
  constructor(private toastCtrl: ToastController ,public quotation: QuotationProvider, navCtrl: NavController, private fb: FormBuilder,public viewCtrl: ViewController, public navParams: NavParams) {
    this.name= navParams.get('data');
    
    this.myGroup = this.fb.group({  
      'amount': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuoteBuilderPage');
  }
  /* requestQuote(amount) {
    amount = amount || 'No Amount Entered';
    this.DataArray.push(amount);
    this.DataArray.push(name);
    alert(this.DataArray);
    this.navCtrl.push(ContactPage, {
      data: amount,
      resName: this.elName
    });
  } */
 
  addQuoteItem() {
    //this.quotation.attempt();
    this.amount = this.myGroup.controls['amount'].value;

    this.quotation.addQuote(this.name, this.amount);

    // const message = 'Added ' + this.amount + ' items of type "' + this.amount + '" to your quote. '
    // + '\nGo to the Contact Us page to request the quote';
    //this.openSnackBar(message);
    this.presentToast();
    this.closeModal();
  }
  public closeModal(){
    this.viewCtrl.dismiss();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Quotation added! Go to the Contact Us page to request the quote',
      duration: 30000,
      position: 'bottom',
      showCloseButton: true
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
    
  }
}
