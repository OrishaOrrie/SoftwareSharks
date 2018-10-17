import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsComponent ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the form should be invalid when empty', () => {
    expect(component.myGroup.valid).toBeFalsy();
  });

  it('all fields should be invalid when empty', () => {
    const name = component.myGroup.controls['name'];
    const email = component.myGroup.controls['email'];
    const message = component.myGroup.controls['message'];
    expect(name.valid).toBeFalsy();
    expect(email.valid).toBeFalsy();
    expect(message.valid).toBeFalsy();
  });

  it('required fields should not be empty', () => {
    let errors = {};
    const email = component.myGroup.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('email values need to be valid', () => {
    let errors = {};
    const email = component.myGroup.controls['email'];
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('valid email values should not have any errors', () => {
    let errors = {};
    const email = component.myGroup.controls['email'];
    email.setValue('test@2');
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
  });

  it('valid email submission should result in a success message being displayed', () => {
    component.myGroup.controls['name'].setValue('JasmineTest');
    component.myGroup.controls['email'].setValue('jasmine@test.com');
    component.myGroup.controls['message'].setValue('JasmineTest is happening hello');
    component.onSubmit();
    expect(component.showSpinner).toBeTruthy();
  });

  it('adding a quote to the message should create a quote message to append', () => {
    component.addQuoteToMessage();
    expect(component.quoteMessage.length).toBeGreaterThan(1);
  });
});
