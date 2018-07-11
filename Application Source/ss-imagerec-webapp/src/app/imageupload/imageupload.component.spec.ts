import { trigger } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from './../material.module';
import { ImageuploadComponent } from './imageupload.component';
import { DebugElement } from '../../../node_modules/@angular/core';
import { By } from '../../../node_modules/@types/selenium-webdriver';

describe('ImageuploadComponent', () => {
  let component: ImageuploadComponent;
  let fixture: ComponentFixture<ImageuploadComponent>;
  let previewEl: DebugElement;

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

    // previewEl = fixture.debugElement.query(By.className('preview'));

    fixture.detectChanges();
  });

  afterEach(() => {
    previewEl = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preview should destroy its children if it is not empty', () => {
    // expect(previewEl.children).toBeNull();
  });
});
