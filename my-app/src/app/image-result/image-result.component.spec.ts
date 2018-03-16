import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResultComponent } from './image-result.component';

describe('ImageResultComponent', () => {
  let component: ImageResultComponent;
  let fixture: ComponentFixture<ImageResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
