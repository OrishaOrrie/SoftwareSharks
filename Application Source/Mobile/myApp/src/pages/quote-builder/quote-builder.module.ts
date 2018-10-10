import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuoteBuilderPage } from './quote-builder';

@NgModule({
  declarations: [
    QuoteBuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(QuoteBuilderPage),
  ],
})
export class QuoteBuilderPageModule {}
