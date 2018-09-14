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

  it('should return false if model is not ready', inject([ModelLoaderService], (service: ModelLoaderService) => {
    service.model = null;
    expect(service.modelIsReady()).toBeFalsy();
  }));

  it('should load the model correctly', inject([ModelLoaderService], (service: ModelLoaderService) => {
    service.loadModel()
    .then(() => {
      expect(service.modelIsReady()).toBeTruthy();
    });
  }));

  it('should change model correctly', inject([ModelLoaderService], (service: ModelLoaderService) => {
    service.changeModel(2);
    expect(service.modelNumber).toEqual(2);
  }));
});
