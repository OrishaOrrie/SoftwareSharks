import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageuploadComponent } from './imageupload.component';

describe('ImageuploadComponent', () => {
  let component: ImageuploadComponent;
  let fixture: ComponentFixture<ImageuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
