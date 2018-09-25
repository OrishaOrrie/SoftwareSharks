import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashOverviewComponent } from './dash-overview.component';

describe('DashOverviewComponent', () => {
  let component: DashOverviewComponent;
  let fixture: ComponentFixture<DashOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
