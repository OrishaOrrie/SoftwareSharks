import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlamesComponent } from './flames.component';

describe('FlamesComponent', () => {
  let component: FlamesComponent;
  let fixture: ComponentFixture<FlamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
