import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DiaryService} from "../../../../../shared/services/diary.service";
import {Observable} from "rxjs";
import {Diary} from "../../../../../shared/class/diary";
import moment from "moment";
import {UserprofileService} from "../../../../../shared/services/userprofile.service";
import {Shift} from "../../../../../shared/class/shift";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";

@Component({
  selector: 'app-list-diary',
  templateUrl: './list-diary.component.html',
  styleUrls: ['./list-diary.component.scss']
})
export class ListDiaryComponent implements OnInit {

  diaries: Observable<Diary[]> | undefined;
  allDiaries: Diary[] = [];
  allShifts: Set<any> = new Set<any>();

  @Output()
  diaryShifts = new EventEmitter<any>();

  @Output()
  allDiariesInClinic = new EventEmitter<any>();

  constructor(
    private diaryService: DiaryService,
    private userProfile: UserprofileService
  ) {
  }

  ngOnInit(): void {
    const user = this.userProfile.getLoggedProfile;
    this.diaries = this.diaryService.getAll().valueChanges();
    const today = moment().toDate();
    this.diaries.subscribe(diary => {
        diary.filter(d => JSON.parse(d.doctor).idNumber === user.idNumber).map(d => {
          const shifts = JSON.parse(d.shifts).filter((shift: Shift) => moment(shift.date).isSameOrAfter(today) && shift.status === ShiftStatus.TAKEN);
          this.allShifts.add(shifts.sort((a: any, b: any) => {
            return a.date - b.date;
          }));
          if (this.allDiaries.indexOf(d) === -1)
            this.allDiaries.push(d)
        })
      }
    );
    this.diaryShifts.emit(this.allShifts)
    this.allDiariesInClinic.emit(this.allDiaries)

  }

  ngOnDestroy() {
    this.diaries = undefined;
  }
}
