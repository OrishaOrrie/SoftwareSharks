import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
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
    MatDividerModule
  ],
  declarations: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MaterialModule { }
