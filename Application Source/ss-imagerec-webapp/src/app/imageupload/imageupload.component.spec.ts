// import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';
import { trigger } from '@angular/animations';
import { async, ComponentFixture, TestBed, tick, inject, fakeAsync } from '@angular/core/testing';
import { MaterialModule } from './../material.module';
import { ImageuploadComponent } from './imageupload.component';
import { DebugElement } from '../../../node_modules/@angular/core';
import { By } from '@angular/platform-browser';
import { ModelLoaderService } from '../model/model-loader.service';
import { FormsModule } from '@angular/forms';
import { QuoteBuilderService } from '../quotebuilder/quote-builder.service';

describe('ImageuploadComponent', () => {
  let component: ImageuploadComponent;
  let fixture: ComponentFixture<ImageuploadComponent>;
  let previewEl, fileSelectEl, webcamButtonEl: DebugElement;
  let captureButton: DebugElement;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageuploadComponent ],
      imports: [
        MaterialModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploadComponent);
    component = fixture.componentInstance;

    previewEl = fixture.debugElement.query(By.css('.preview'));
    fileSelectEl = fixture.debugElement.query(By.css('#file-upload'));
    webcamButtonEl = fixture.debugElement.query(By.css('#webcam-upload'));
    captureButton = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();
  });

  afterEach(() => {
    previewEl = null;
    fileSelectEl = null;
    spy = null;
  });

  it('should create', async(inject([ModelLoaderService],
    (service: ModelLoaderService, qs: QuoteBuilderService) => {
    expect(component).toBeTruthy();
  })));

  it('madeChange should be called when a file has been selected', () => {
    spy = spyOn(component, 'madeChange');
    fileSelectEl.triggerEventHandler('change', true);
    expect(spy).toHaveBeenCalled();
  });

  it('a message should be displayed if no file was selected', () => {
    spy = spyOn(component, 'updateInstruction');
    component.madeChange();
    fixture.detectChanges();
    expect(previewEl.children.length).toBe(1);
  });

  it('should display an appropriate message if no image has been captured', () => {
    component.imgAvailable = true;
    component.uploadCapture = false;
    component.updateInstruction();
    expect(component.instruction).toBe('Click Submit to submit the selected image');
  });

  xit('an image should appear if a file was selected', () => {
    const mockBlob = new Blob([''], {type: 'image/png'});
    mockBlob['lastModifiedDate'] = '';
    mockBlob['name'] = 'fileName';
    const mockFile = <File>mockBlob;

    fileSelectEl.nativeElement.setAttribute('file', mockFile);
    component.madeChange();
    fixture.detectChanges();
    expect(fileSelectEl.nativeElement.getAttribute('files.length')).toBeTruthy();
    expect(component.imgAvailable).toBeTruthy();
  });

  /**
   * Formatted File Size function
   */
  it('should return a formatted file size in bytes if small', () => {
    const size = 200;
    expect(component.formattedFileSize(size)).toBe('200 bytes');
  });

  it('should return a formatted file size in KB if medium', () => {
    const size = 1800;
    expect(component.formattedFileSize(size)).toBe('1.76KB');
  });

  it('should return a formatted file size in MB if large', () => {
    const size = 1800000;
    expect(component.formattedFileSize(size)).toBe('1.72MB');
  });

  /**
   * Webcam option
   */
  it('webcam should activate when Webcam Capture is clicked', () => {
    spy = spyOn(navigator.mediaDevices, 'getUserMedia');
    webcamButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
  });

  it('video should display when Webcam Capture is clicked', () => {
    webcamButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(previewEl.children.length).toBeTruthy();
  });

  it('video should display when Webcam Capture is clicked', () => {
    webcamButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    captureButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(previewEl.children.length).toBeTruthy();
  });

  /**
   * Model service integration
   */
  it('should update status text if an image is being predicted', () => {
    // tslint:disable-next-line:prefer-const
    let testImg: HTMLImageElement;
    component.image = testImg;
    component.predictImage();
    fixture.detectChanges();
    expect(component.modelStatus).toBe('Predicting...');
  });

  it('should change the model correctly', () => {
    component.changeSelectedModel();
    fixture.detectChanges();
    expect(component.modelStatus).toBe('Loading...');
  });

});
