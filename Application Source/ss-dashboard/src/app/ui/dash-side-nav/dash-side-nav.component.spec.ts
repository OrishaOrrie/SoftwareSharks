import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSideNavComponent } from './dash-side-nav.component';

describe('DashSideNavComponent', () => {
  let component: DashSideNavComponent;
  let fixture: ComponentFixture<DashSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
