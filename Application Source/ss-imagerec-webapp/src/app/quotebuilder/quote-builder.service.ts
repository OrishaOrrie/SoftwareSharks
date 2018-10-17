import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteBuilderService {

  /**
   * An array of all quote elements added from the imagerec component
   */
  private quoteList: any[] = [];

  /**
   * Evaluates to true if the quoteList has been added to at least once
   */
  private quoteStarted = false;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Adds the quote object from the quote dialog to the quoteList
   * @param name The name of the item that is to be part of the quote
   * @param amount The amount of the item that is part of the quote
   */
  addQuote(name: string, amount: number) {
    const quote = {
      'name': name,
      'amount': amount
    };
    this.quoteList.push(quote);
    this.quoteStarted = true;
  }

  /**
   * Gets the number of quote items added
   */
  getNumQuoteItems() {
    return this.quoteList.length;
  }

  /**
   * Evaluates to true if the quoteList has been added to at least once
   */
  isQuoteStarted() {
    return this.quoteStarted;
  }

  /**
   * Returns the array of quote elements
   */
  getQuoteList() {
    return this.quoteList;
  }
}
