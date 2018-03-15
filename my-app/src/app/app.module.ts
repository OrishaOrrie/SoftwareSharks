import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';
import { FormsModule } from '@angular/forms' ;

import { FileUploadModule } from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { ToolbarModule } from 'primeng/toolbar';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ImageUploaderComponent } from './imageuploader/imageuploader.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule,  MatToolbarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ImageUploadModule } from "angular2-image-upload";


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ImageUploaderComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    ToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    GrowlModule,
    HttpClientModule,
    ImageUploadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

