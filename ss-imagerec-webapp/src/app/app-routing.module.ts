import { HomeComponent } from './home/home.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'imageupload', component: ImageuploadComponent},
  { path: 'home', component: HomeComponent},
  { path: 'contactus', component: ContactUsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
