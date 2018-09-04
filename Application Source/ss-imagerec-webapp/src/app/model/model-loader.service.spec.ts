import { TestBed, inject } from '@angular/core/testing';

import { ModelLoaderService } from './model-loader.service';

describe('ModelLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelLoaderService]
    });
  });

  it('should be created', inject([ModelLoaderService], (service: ModelLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
