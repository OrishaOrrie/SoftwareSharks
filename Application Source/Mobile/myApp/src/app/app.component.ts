/**
 * File Name:       app.component.ts
 * Version Number:  v1.1
 * Author:          Orisha Orrie
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author		Description
 * 20/07/2018   Orisha		Created component		
 * ------------------------------------------
 * Functional Description:
 *  Main app component interface. Pages created here.
 */


import { Component  , ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Camera, CameraOptions } from '@ionic-native/camera';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// import { UtilitiesPage } from '../pages/utilities/utilities';
import { ImagerecPage } from '../pages/imagerec/imagerec';
import { ModelLoaderProvider } from '../providers/model-loader/model-loader';


export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;
  isLoaded = false;
  pages: Array<{ title: string, component: any }>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modelLoader: ModelLoaderProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();

      console.log('App: Calling provider function - loadModel');
      modelLoader.loadModel();
    });
  
    this.pages = [
      { title: 'Custom image recognition', component: ImagerecPage },
      { title: 'Need Help?', component: ContactPage },
      { title: 'About Us', component: AboutPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  
  isActive(page)
  {

  }
}
