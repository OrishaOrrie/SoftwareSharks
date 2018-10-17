import { MaterialModule } from './../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UtilitiesComponent } from './utilities.component';

describe('UtilitiesComponent', () => {
  let component: UtilitiesComponent;
  let fixture: ComponentFixture<UtilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitiesComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should output the correct value for valid calculations', () => {
    component.single_item = 5;
    component.empty_bucket = 10;
    component.filled_bucket = 55;
    expect(component.result()).toBe('Number of items: 9');
  });

  it('should output validation message for empty inputs', () => {
    component.single_item = null;
    component.empty_bucket = 10;
    component.filled_bucket = 55;
    expect(component.result()).toBe('Weight inputs cannot be empty');
  });

  it('should output validation message for invalid inputs', () => {
    component.single_item = 5;
    component.empty_bucket = 100;
    component.filled_bucket = 55;
    expect(component.result()).toBe('Empty bucket cannot weigh more than a filled bucket');
  });

  it('should output validation message for negative inputs', () => {
    component.single_item = -5;
    component.empty_bucket = 10;
    component.filled_bucket = 55;
    expect(component.result()).toBe('Weight value must be a positive value');
  });
});
