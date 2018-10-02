import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { MatInputModule, MatListModule, MatDividerModule, MatTableModule, MatSelectModule , MatCardModule} from '@angular/material';
import { MatGridListModule, MatIconModule, MatProgressSpinnerModule  } from '@angular/material';

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
    MatTableModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MaterialModule { }
