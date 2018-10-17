/**
 * File Name:       utilities.component
 * Version Number:  v1.0
 * Author:          Tobias Bester
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author        Description
 * 01/03/2018   Tobias        Created components
 * ------------------------------------------
 * Test Cases:      utilities.component.spec.ts
 * Functional Description:
 *  Provides utilites such as an item weight calculator. More to be added in future releases.
 */

import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

  // Filled bucket - empty bucket = weight of all items
  // weight of all items / single item weight = num items

  /**
   * The weight value of an individual item
   */
  single_item = 1.0;

  /**
   * The weight value of an empty bucket
   */
  empty_bucket = 2.0;

  /**
   * The weight value of a bucket filled with items
   */
  filled_bucket = 10.0;

  /** The Number of Items is calculated by taking the weight of the items excluding the bucket
   *  dividing it by the weight of a single item.
   */

  /**
   * Math object to make use of the floor function
   */
  Math: Math = Math;

  result = (() => {
    if (this.empty_bucket > this.filled_bucket) {
      return 'Empty bucket cannot weigh more than a filled bucket';
    }

    if (!this.empty_bucket || !this.filled_bucket || !this.single_item) {
      return 'Weight inputs cannot be empty';
    }

    if (this.empty_bucket <= 0 || this.filled_bucket <= 0 || this.single_item <= 0 ) {
      return 'Weight value must be a positive value';
    }

    return 'Number of items: ' + Math.floor((this.filled_bucket - this.empty_bucket) / this.single_item);
  });

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

}
