import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DiaryService} from "../../../../../shared/services/diary.service";
import moment from "moment";
import {Shift} from "../../../../../shared/class/shift";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";
import {Subscription} from "rxjs";
import {ImageServiceService} from "../../../../../shared/services/image-service.service";

@Component({
  selector: 'app-patient-shift-request',
  templateUrl: './patient-shift-request.component.html',
  styleUrls: ['./patient-shift-request.component.scss']
})
export class PatientShiftRequestComponent implements OnInit, OnDestroy {
  allShifts: Set<any> = new Set<any>();
  allDiaries: any[] = [];
  selectedDiary: any;
  subscription?: Subscription;

  @Output()
  selectedDoctor = new EventEmitter<any>();

  @Output()
  allShiftsClinic = new EventEmitter<any>();

  constructor(private diaryService: DiaryService, private imageService: ImageServiceService) {
  }

  ngOnInit(): void {
    setTimeout(() => this.loadData(), 100)
  }

  private loadData() {
    const today = moment().toDate();
    this.subscription = this.diaryService.getAll().valueChanges()
      .subscribe(diary => {
        diary.map(d => {
            this.imageService.getByIdNumber(JSON.parse(d.doctor).idNumber).then(photo => {
              this.allShiftsClinic.emit(JSON.parse(d.shifts));
              const shifts = JSON.parse(d.shifts).filter((shift: Shift) => moment(shift.date).isSameOrAfter(today) && shift.status === ShiftStatus.AVAILABLE);
              d.shifts = JSON.stringify(shifts);
              this.allShifts.add(shifts.sort((a: any, b: any) => {
                return a.date - b.date;
              }));
              if (this.allDiaries.indexOf(d) === -1)
                this.allDiaries.push({doctor: d, photo: JSON.parse(photo.images)[0]})
            });
          })
        }
      );
  }

  selectDoctorDiary(doctor: any) {
    this.subscription?.unsubscribe();
    this.selectedDoctor.emit(doctor)
  }

  getDoctorName(doctor: any){
    const shiftDoctor = JSON.parse(doctor.doctor.doctor);
    return shiftDoctor.firstName + " " + shiftDoctor.lastName
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
