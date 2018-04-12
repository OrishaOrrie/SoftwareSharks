import { Component, OnInit } from '@angular/core';

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
