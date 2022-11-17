import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientShiftRequestComponent } from './patient-shift-request.component';

describe('PatientShiftRequestComponent', () => {
  let component: PatientShiftRequestComponent;
  let fixture: ComponentFixture<PatientShiftRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientShiftRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientShiftRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
