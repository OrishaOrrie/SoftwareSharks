import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule } from '@angular/material';
import { MatInputModule, MatListModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MaterialModule { }
