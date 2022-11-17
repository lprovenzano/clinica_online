import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientShiftListComponent } from './patient-shift-list.component';

describe('PatientShiftListComponent', () => {
  let component: PatientShiftListComponent;
  let fixture: ComponentFixture<PatientShiftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientShiftListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientShiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
