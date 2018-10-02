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

import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quote-dialog',
  templateUrl: './quote-dialog.component.html',
  styleUrls: ['./quote-dialog.component.css']
})
export class QuoteDialogComponent implements OnInit {

  quoteForm: FormGroup;
  item: string;
  amount: number;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<QuoteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
    this.quoteForm = this.fb.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.max(1000),
        Validators.min(1)
      ]))
    });
  }

}
