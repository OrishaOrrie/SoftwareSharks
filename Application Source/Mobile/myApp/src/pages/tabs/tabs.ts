import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { UtilitiesPage } from '../utilities/utilities';
import { ImagerecPage } from '../imagerec/imagerec';

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
