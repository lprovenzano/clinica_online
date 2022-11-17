import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {doc} from "@angular/fire/firestore";

@Component({
  selector: 'app-patient-shift-selected',
  templateUrl: './patient-shift-selected.component.html',
  styleUrls: ['./patient-shift-selected.component.scss']
})
export class PatientShiftSelectedComponent implements OnInit {

  @Input()
  doctor: any;

  @Input()
  allShiftClinic: Set<any> = new Set<any>();

  @Output()
  selectShifts = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  showShifts() {
    this.selectShifts.emit(JSON.parse(this.doctor.doctor.shifts))
  }
}
