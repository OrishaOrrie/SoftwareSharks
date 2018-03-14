import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImageuploaderComponent } from './imageuploader/imageuploader.component';
import { HomepageComponent } from './homepage/homepage.component';

//import components added here
import {MatMenuModule, MatButtonModule, MatIconModule, MatCardModule,  MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ImageuploaderComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

