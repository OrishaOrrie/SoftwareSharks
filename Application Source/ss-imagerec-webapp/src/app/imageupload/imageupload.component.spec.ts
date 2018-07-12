import { trigger } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from './../material.module';
import { ImageuploadComponent } from './imageupload.component';
import { DebugElement } from '../../../node_modules/@angular/core';
import { By } from '@angular/platform-browser';

describe('ImageuploadComponent', () => {
  let component: ImageuploadComponent;
  let fixture: ComponentFixture<ImageuploadComponent>;
  let previewEl, fileSelectEl: DebugElement;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageuploadComponent ],
      imports: [
        MaterialModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploadComponent);
    component = fixture.componentInstance;

    previewEl = fixture.debugElement.query(By.css('.preview'));
    fileSelectEl = fixture.debugElement.query(By.css('#file-upload'));

    fixture.detectChanges();
  });

  afterEach(() => {
    previewEl = null;
    fileSelectEl = null;
    spy = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('madeChange should be called when a file has been selected', () => {
    spy = spyOn(component, 'madeChange');
    fileSelectEl.triggerEventHandler('change', true);
    expect(spy).toHaveBeenCalled();
  });

  xit('preview should have removed all of its children', () => {
    const numChildren = previewEl.children.length;
    spy = spyOn(previewEl, 'removeChild');
    component.madeChange();
    fixture.detectChanges();
    expect(previewEl.removeChild).toHaveBeenCalledTimes(numChildren);
  });

  it('a message should be displayed if no file was selected', () => {
    spy = spyOn(component, 'updateInstruction');
    component.madeChange();
    fixture.detectChanges();
    expect(previewEl.children.length).toBe(1);
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

  it('should display an error message if no image is selected when Upload is clicked', () => {
    component.uploadCapture = false;
    component.imageToUpload = null;
    spy = spyOn(component, 'updateInstruction');
    component.uploadImage();
    fixture.detectChanges();
    expect(component.updateInstruction).toHaveBeenCalled();
  });

  it('should call the http function if an image is selected when Upload is clicked', () => {
    const mockBlob = new Blob([''], {type: 'image/png'});
    mockBlob['lastModifiedDate'] = '';
    mockBlob['name'] = 'fileName';
    const mockFile = <File>mockBlob;

    component.uploadCapture = false;
    component.imageToUpload = mockFile;
    spy = spyOn(component, 'httpUploadImage');
    component.uploadImage();
    fixture.detectChanges();
    expect(component.httpUploadImage).toHaveBeenCalled();
  });

  it('should call getCapturedImage if the webcam option was selected and the Upload button is clicked', () => {
    component.uploadCapture = true;
    component.imageToUpload = null;
    spy = spyOn(component, 'getCapturedImage');
    let spy2 = spy;
    spy2 = spyOn(component, 'updateInstruction');
    component.uploadImage();
    fixture.detectChanges();
    expect(component.getCapturedImage).toHaveBeenCalled();
    expect(component.updateInstruction).toHaveBeenCalled();
  });

});
