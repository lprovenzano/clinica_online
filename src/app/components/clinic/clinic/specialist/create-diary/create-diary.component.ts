import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserprofileService} from "../../../../../shared/services/userprofile.service";
import {DiaryService} from "../../../../../shared/services/diary.service";
import {Diary} from "../../../../../shared/class/diary";
import {Shift} from "../../../../../shared/class/shift";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";
import {Survey} from "../../../../../shared/class/survey";
import {DateService} from "../../../../../shared/services/date.service";
import {Doctor} from "../../../../../shared/class/doctor";
import {DiagnosticCategoryLabel} from "@angular/compiler-cli/src/ngtsc/core/api";
import {DiaryStatus} from "../../../../../shared/enums/diary-status";
import * as Console from "console";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.scss']
})
export class CreateDiaryComponent implements OnInit {

  formGroup: FormGroup;
  selectedDay: any;
  dateTo: any = 18;
  sent = false;
  specialties: any[] = []
  private controls = {
    'from': [null, [Validators.required, Validators.min(9), Validators.max(18)]],
    'to': [null, [Validators.required, Validators.min(9), Validators.max(this.dateTo)]],
  }

  constructor(private formBuilder: FormBuilder,
              public userprofileService: UserprofileService,
              private diaryService: DiaryService,
              private dateService: DateService,
              private router: Router) {
    this.formGroup = this.formBuilder.group(this.controls);
  }

  ngOnInit(): void {
    this.selectDay('lunes')
  }

  addDiary() {
    const day = this.selectedDay;
    const from = Number(this.formGroup.value.from);
    const to = Number(this.formGroup.value.to);
    let shifts: Shift[] = []
    const survey = [new Survey('Que te pareció la consulta con el profesional?', ""), new Survey('Como te ayudo la plataforma?', "")]
    const doctor = new Doctor(this.userprofileService.getLoggedProfile.firstName, this.userprofileService.getLoggedProfile.lastName, this.userprofileService.getLoggedProfile.specialties, this.userprofileService.getLoggedProfile.idNumber)
    let diary: any[] = []
    this.specialties
      .forEach(s => {
        this.dateService.getNextDatesInMonth(day, from, to)
          .forEach((date, dateIndex) => {
              const shift = new Shift((dateIndex + 1), ShiftStatus.AVAILABLE, "", survey, date, s);
              console.log(shift)
              shifts.push(shift)
            }
          );
        diary.push(new Diary(shifts, doctor, s, day, from, to, DiaryStatus.AVAILABLE));
      })
    setTimeout(()=> {
      this.diaryService.create(diary[0])
      Swal.fire({
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    },1000)
  }

  isValidForm() {
    return !this.formGroup.valid || this.specialties.length === 0;
  }

  selectDay(day: string) {
    this.selectedDay = day;
    if (day === 'sabado') {
      this.dateTo = 14;
      this.formGroup.removeControl('to');
      this.formGroup.addControl('to', this.formBuilder.control('14', [Validators.required, Validators.min(9), Validators.max(this.dateTo)]))
    }
  }

  checkSpecialty(specialty: any) {
    if (this.specialties.indexOf(specialty) === -1) {
      this.specialties.push(specialty)
    } else {
      this.specialties = this.specialties.filter(x => x !== specialty);
    }
  }
}
