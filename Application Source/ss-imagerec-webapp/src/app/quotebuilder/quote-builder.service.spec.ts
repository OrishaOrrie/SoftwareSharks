import { TestBed } from '@angular/core/testing';

import { QuoteBuilderService } from './quote-builder.service';

describe('QuoteBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoteBuilderService = TestBed.get(QuoteBuilderService);
    expect(service).toBeTruthy();
  });

  it('should add an element to the quote list', () => {
    const service: QuoteBuilderService = TestBed.get(QuoteBuilderService);
    service.addQuote('Hammer', 5);
    expect(service.getNumQuoteItems()).toBe(1);
  });

  it('should state that the quote has been started', () => {
    const service: QuoteBuilderService = TestBed.get(QuoteBuilderService);
    service.addQuote('Hammer', 5);
    expect(service.isQuoteStarted()).toBeTruthy();
  });

  it('should state return the quote list', () => {
    const service: QuoteBuilderService = TestBed.get(QuoteBuilderService);
    service.addQuote('Hammer', 5);
    expect(service.getQuoteList()).toBeTruthy();
  });
});
