import { TestBed, inject } from '@angular/core/testing';
import * as tf from '@tensorflow/tfjs';
import { ModelLoaderService } from './model-loader.service';

describe('ModelLoaderService', () => {

  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelLoaderService]
    });
  });

  afterEach(() => {
    spy = null;
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

  it('should not change model again', inject([ModelLoaderService], (service: ModelLoaderService) => {
    spy = spyOn(console, 'log');
    service.changeModel(2);
    service.changeModel(2);
    expect(spy).toHaveBeenCalled();
  }));

  it('should predict an image', inject([ModelLoaderService], (service: ModelLoaderService) => {
    // const testTensor = tf.zeros([1, 224, 224, 3]) as tf.Tensor<tf.Rank>;
    // tslint:disable-next-line:prefer-const
    let testImg: HTMLImageElement;
    expect(service.predictImage(testImg)).toBeTruthy();
  }));

  xit('should crop an image', inject([ModelLoaderService], (service: ModelLoaderService) => {
    spy = spyOn(service, 'cropImage');
    // tslint:disable-next-line:prefer-const
    let testImg: HTMLImageElement;
    service.predictImage(testImg);
    expect(spy).toHaveBeenCalled();
  }));

  it('should sort the predictions', inject([ModelLoaderService], (service: ModelLoaderService) => {
    spy = spyOn(service, 'sortPreds');
    // tslint:disable-next-line:prefer-const
    let testImg: HTMLImageElement;
    const classPreds = service.predictImage(testImg);
    service.mapPredictions(classPreds);
    expect(spy).toHaveBeenCalled();
  }));

  it('should process the predictions', inject([ModelLoaderService], (service: ModelLoaderService) => {
    spy = spyOn(service, 'processResultNames');
    // tslint:disable-next-line:prefer-const
    let testImg: HTMLImageElement;
    const classPreds = service.predictImage(testImg);
    service.mapPredictions(classPreds);
    expect(spy).toHaveBeenCalled();
  }));
});
