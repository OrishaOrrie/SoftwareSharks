import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImageuploaderComponent } from './imageuploader/imageuploader.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageuploaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
