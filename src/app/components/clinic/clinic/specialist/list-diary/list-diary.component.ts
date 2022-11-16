import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DiaryService} from "../../../../../shared/services/diary.service";
import {Observable, Subscription} from "rxjs";
import {Diary} from "../../../../../shared/class/diary";
import moment from "moment";
import {UserprofileService} from "../../../../../shared/services/userprofile.service";
import {Shift} from "../../../../../shared/class/shift";
import {DiaryStatus} from "../../../../../shared/enums/diary-status";

@Component({
  selector: 'app-list-diary',
  templateUrl: './list-diary.component.html',
  styleUrls: ['./list-diary.component.scss']
})
export class ListDiaryComponent implements OnInit, OnDestroy {

  diaries: Observable<Diary[]> | undefined;
  allDiaries: Set<any> = new Set<any>();
  allShifts: Set<any> = new Set<any>();

  @Output()
  diaryShifts = new EventEmitter<any>();

  @Output()
  allDiariesInClinic = new EventEmitter<any>();
  private suscriber: Subscription = new Subscription();

  @Output()
  diarySuscriber = new EventEmitter<any>();

  constructor(
    private diaryService: DiaryService,
    private userProfile: UserprofileService
  ) {
  }

  ngOnInit(): void {
    const user = this.userProfile.getLoggedProfile;
    this.diaries = this.diaryService.getAll().valueChanges();
    const today = moment().toDate();
    this.suscriber = this.diaries.subscribe(diary => {
        diary.filter(d => JSON.parse(d.doctor).idNumber === user.idNumber)
          .map(d => {
            const shifts = JSON.parse(d.shifts).filter((shift: Shift) => moment(shift.date).isSameOrAfter(today));
            this.allShifts.add(shifts);
            this.allDiaries.add(d)
          })
      }
    );
    this.diaryShifts.emit(this.allShifts)
    this.allDiariesInClinic.emit(this.allDiaries)
    this.diarySuscriber.emit(this.suscriber)
  }

  ngOnDestroy(): void {
    this.suscriber.unsubscribe();
  }

}
