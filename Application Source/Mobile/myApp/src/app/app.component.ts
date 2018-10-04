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

/**
 * Interface used to manage pages and tab-based navigation
 */
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

  /**
   * The root page should be the page with the Tabs
   */
  rootPage: any = TabsPage;
  /**
   * Array of page objects which are in the form (title, component)
   */
  pages: Array<{ title: string, component: any }>;

  /**
   * Creates the status bar and requests the model to be loaded as soon as the platform is ready
   * @param platform Default Ionic platofrm
   * @param statusBar Cordova plugin for a statusbar
   * @param splashScreen Cordova plugin for the splash screen
   * @param modelLoader Provider that handles model loading and image classification
   */
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

  /**
   * Handles which page is opened depending on which tab is pressed
   * @param page Determines which page is opened
   */
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  
}
