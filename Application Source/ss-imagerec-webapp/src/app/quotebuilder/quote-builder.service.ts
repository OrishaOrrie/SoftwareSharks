import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteBuilderService {

  private quoteList: any[] = [];
  private quoteStarted = false;

  constructor() { }

  addQuote(name: string, amount: number) {
    const quote = {
      'name': name,
      'amount': amount
    };
    this.quoteList.push(quote);
    this.quoteStarted = true;
  }

  getNumQuoteItems() {
    return this.quoteList.length;
  }

  isQuoteStarted() {
    return this.quoteStarted;
  }

  getQuoteList() {
    return this.quoteList;
  }
}
