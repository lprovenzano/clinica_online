import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {UserprofileService} from "../../../shared/services/userprofile.service";
import {Diary} from "../../../shared/class/diary";
import {Shift} from "../../../shared/class/shift";
import moment from "moment";
import {DiaryService} from "../../../shared/services/diary.service";

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  shifts: Set<any> = new Set<any>();
  allShiftClinic: Set<any> = new Set<any>();
  allDiariesClinic: Set<any> = new Set<any>();
  diaries: Set<any> = new Set<any>();
  selectedDoctor: any;
  selectedShifts: any[] = [];
  diarySuscriber: any;
  suscriber: any | undefined;

  constructor(
    public authService: AuthService,
    public diaryService: DiaryService,
    public userProfile: UserprofileService) {
  }

  ngOnInit(): void {
    this.suscriber = this.diaryService.getAll().get().subscribe(diary => {
        diary.docs
          .map(d => {
            this.allDiariesClinic.add(d.data())
            this.allShiftClinic.add(JSON.parse(d.data().shifts))
          })
      }
    );
  }

  processShifts($event: any) {
    this.shifts = $event
  }

  processDiaries($event: any) {
    this.diaries = $event;
  }

  processSelectedDoctor($event: any) {
    this.selectedDoctor = $event;
  }

  processSelectedShifts($event: any) {
    this.selectedShifts = $event;
  }

  processDiarySuscriber($event: any) {
    this.diarySuscriber = $event;
  }

  // processAllShiftClinic($event: any) {
  //   this.allShiftClinic = $event;
  // }
}
