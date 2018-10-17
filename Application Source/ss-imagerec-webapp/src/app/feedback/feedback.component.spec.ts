import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackComponent ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    spy = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the form should be invalid when empty', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('all fields should be invalid when empty', () => {
    const name = component.formGroup.controls['name'];
    const message = component.formGroup.controls['message'];
    expect(name.valid).toBeFalsy();
    expect(message.valid).toBeFalsy();
  });

  it('required fields should not be empty', () => {
    let errors = {};
    const name = component.formGroup.controls['name'];
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should submit the form by making a POST request', () => {
    spy = spyOn(component.http, 'post');
    component.formGroup.controls['name'].setValue('Karma Test');
    component.formGroup.controls['feedType'].setValue('Bug');
    component.formGroup.controls['message'].setValue('Testing Testing tTEsinsg');
    fixture.detectChanges();
    component.postMessage();
    // fixture.detectChanges();
    // component.submitForm();
    // fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
