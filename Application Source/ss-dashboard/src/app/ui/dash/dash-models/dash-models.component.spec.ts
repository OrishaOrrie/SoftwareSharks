import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashModelsComponent } from './dash-models.component';

describe('DashModelsComponent', () => {
  let component: DashModelsComponent;
  let fixture: ComponentFixture<DashModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
