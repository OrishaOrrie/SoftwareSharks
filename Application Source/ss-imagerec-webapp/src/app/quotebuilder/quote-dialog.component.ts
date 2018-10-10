/**
 * File Name:       quote-dialog.component
 * Version Number:  v1.0
 * Author:          Tobias Bester
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 02/10/2018   Tobias        Created components
 * ------------------------------------------
 * Test Cases:      quote-dialog.component.spec.ts
 * Functional Description:
 *  Provides interface to add an amount of items to a quote.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { QuoteBuilderService } from './quote-builder.service';

@Component({
  selector: 'app-quote-dialog',
  templateUrl: './quote-dialog.component.html',
  styleUrls: ['./quote-dialog.component.css']
})
export class QuoteDialogComponent implements OnInit {

  /**
   * The FormGroup used to control the modal input form
   */
  quoteForm: FormGroup;

  /**
   * The name of the item that is to be added to the quote
   */
  item: string;

  /**
   * The amount of the item that is added to the quote
   */
  amount: number;

  /**@ignore */
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<QuoteDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
  public snackbar: MatSnackBar, public qb: QuoteBuilderService) {
    this.item = data.name;
  }

  /**
   * Sets up the FormGroup with the validators for the amount input field
   */
  ngOnInit() {
    this.quoteForm = this.fb.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.max(1000),
        Validators.min(1)
      ]))
    });
  }

  /**
   * Calls the QuoteBuilder Service to add the input quote details and display a snack bar on success
   */
  addQuoteItem() {
    this.amount = this.quoteForm.controls['amount'].value;

    this.qb.addQuote(this.item, this.amount);

    const message = 'Added ' + this.amount + ' items of type "' + this.item + '" to your quote. '
    + '\nGo to the Contact Us page to request the quote';
    this.openSnackBar(message);

    this.dialogRef.close();
  }

  /**
   * Opens the snackbar which displays the input message
   * @param message The string that is to be displayed
   */
  openSnackBar(message: string) {
    this.snackbar.open(message, 'Okay', {
      duration: 5000
    });
  }

  /**
   * @ignore
   */
  closeDialog() {
    this.dialogRef.close();
  }

}
