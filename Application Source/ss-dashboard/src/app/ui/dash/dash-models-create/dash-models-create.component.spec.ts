import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashModelsCreateComponent } from './dash-models-create.component';

describe('DashModelsCreateComponent', () => {
  let component: DashModelsCreateComponent;
  let fixture: ComponentFixture<DashModelsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashModelsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashModelsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
