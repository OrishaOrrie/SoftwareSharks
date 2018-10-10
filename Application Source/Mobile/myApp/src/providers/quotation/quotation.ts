import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QuotationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuotationProvider {
  private quoteList: any[] = [];
  private quoteStarted = false;

  constructor(public http: HttpClient) {
    console.log('Hello QuotationProvider Provider');
  }
attempt()
{
  alert("aefwe");
}

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
