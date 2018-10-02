import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashModelsEditComponent } from './dash-models-edit.component';

describe('DashModelsEditComponent', () => {
  let component: DashModelsEditComponent;
  let fixture: ComponentFixture<DashModelsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashModelsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashModelsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
