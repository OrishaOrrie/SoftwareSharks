/* File Name: utilities.component
Version Number: v1.0
Author Name: Tobias Bester
Project Name: Ninshiki
Organization: Software Sharks
Requirements: Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
Update History:
----–––-––-–––---––––---––––--–––---––––-
Date––––Author––––Description–––––––––
01/03/2018 - Tobias - Created Utilities
----–––-––-–––---––––---––––--–––---––––-
Test Cases: utilities.component.spec.ts
Functional Description: Provides utilities such as item weight calculator. More to be added */

import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

  // Filled bucket - empty bucket = weight of all items
  // weight of all items / single item weight = num items
  single_item = 1;    // Item Weight: 1kg
  empty_bucket = 1;   // Empty Bucket Weight: 5kg
  filled_bucket = 1;  // Filled Bucket Weight: 20kg;
  // num_items would be (20 - 5)/1
  num_items = Math.floor(2.51);

  Math: Math = Math;
  constructor() { }

  ngOnInit() {
  }

}
