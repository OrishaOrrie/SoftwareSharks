/**
* File Name:       tabs.ts
* Version Number:  v1.1
* Author:          Orisha Orrie
* Project Name:    Ninshiki
* Organization:    Software Sharks
* User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
* Update History:
* ------------------------------------------
* Date         Author		Description
* 20/07/2018   Orisha		Created component
* 18/09/2018   Orisha	  Fixed layout
* 18/09/2018   Orisha   Added tabs
* ------------------------------------------
* Functional Description:
*  The functionality tabs at the bottom of the page is done here. 
*  Links to switch between different pages are all here.
*/


import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { UtilitiesPage } from '../utilities/utilities';
import { ImagerecPage } from '../imagerec/imagerec';

/**
 * @ignore
 */
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = UtilitiesPage;
  tab4Root = ContactPage;
  tab5Root = ImagerecPage;

  constructor() {

  }
}
