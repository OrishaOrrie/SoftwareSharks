import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTrainComponent } from './dash-train.component';

describe('DashTrainComponent', () => {
  let component: DashTrainComponent;
  let fixture: ComponentFixture<DashTrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashTrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
