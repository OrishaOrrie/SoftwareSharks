import { Component } from '@angular/core';
import { QuoteBuilderService } from './quotebuilder/quote-builder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ninshiki';
  quoteStarted = new Observable((data) => {
    setInterval(() => {
      data.next(this.qb.isQuoteStarted());
    }, 1000);
  });
  numQuoteItems = new Observable((data) => {
    setInterval(() => {
      data.next(this.qb.getNumQuoteItems());
    }, 1000);
  });

  constructor(public qb: QuoteBuilderService) {
  }
}
