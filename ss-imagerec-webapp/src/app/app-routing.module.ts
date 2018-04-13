import { ContactUsComponent } from './contact-us/contact-us.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { HomeComponent } from './home/home.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'imageupload', component: ImageuploadComponent},
  { path: 'home', component: HomeComponent},
  { path: 'utilities', component: UtilitiesComponent},
  { path: 'contactus', component: ContactUsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', useHash: false})
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppRoutingModule { }
