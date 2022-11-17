import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientShiftRequestListComponent } from './patient-shift-request-list.component';

describe('PatientShiftRequestListComponent', () => {
  let component: PatientShiftRequestListComponent;
  let fixture: ComponentFixture<PatientShiftRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientShiftRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientShiftRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
