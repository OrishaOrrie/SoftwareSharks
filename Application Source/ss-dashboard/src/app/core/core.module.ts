import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AlertService } from './alert/alert.service';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ModelsService } from './data/models.service';
import { BackendService } from './http/backend.service';
import { HttpInterceptProviders } from './http/http-intercept-providers';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,  // imports firebase/auth, only needed for auth features,
  ],
  declarations: [],
  providers: [
    AuthService,
    AlertService,
    ModelsService,
    BackendService,
    HttpInterceptProviders
  ]
})
export class CoreModule { }
