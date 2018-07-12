/* File Name: home.component
Version Number: v1.0
Author Name: Tobias Bester
Project Name: Ninshiki
Organization: Software Sharks
Requirements: Refer to the Ninshiki User Manual at https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
Update History:
----–––-––-–––---––––---––––--–––---––––-
Date––––Author––––Description–––––––––
01/03/2018 - Tobias - Created Home
----–––-––-–––---––––---––––--–––---––––-
Test Cases: home.component.spec.ts
Functional Description: Acts as landing page and provides routes to the other pages */

/**
 * File Name:       home.component
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
 * Test Cases:      home.component.spec.ts
 * Functional Description:
 *  Acts as landing page for the web app and provides links to application functions.
 */

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../node_modules/hover.css/css/hover-min.css'],
  animations: []
})
export class HomeComponent implements OnInit {

  state = false;

  constructor() { }

  ngOnInit() {
  }

}
