import { MaterialModule } from './../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UppyfileModule } from './../uppyfile.module';

import { UtilitiesComponent } from './utilities.component';

describe('UtilitiesComponent', () => {
  let component: UtilitiesComponent;
  let fixture: ComponentFixture<UtilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitiesComponent ],
      imports: [
        MaterialModule,
        UppyfileModule,
        FormsModule
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
});
