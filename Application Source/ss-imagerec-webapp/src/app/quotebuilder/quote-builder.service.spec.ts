import { TestBed } from '@angular/core/testing';

import { QuoteBuilderService } from './quote-builder.service';

describe('QuoteBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoteBuilderService = TestBed.get(QuoteBuilderService);
    expect(service).toBeTruthy();
  });
});
