import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientShiftSelectedComponent } from './patient-shift-selected.component';

describe('PatientShiftSelectedComponent', () => {
  let component: PatientShiftSelectedComponent;
  let fixture: ComponentFixture<PatientShiftSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientShiftSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientShiftSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
