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
    this.suscriber = this.diaryService.getAll().valueChanges().subscribe(diary => {
        diary.filter(d => JSON.parse(d.doctor).idNumber === user.idNumber)
          .map(d => {
            this.allDiaries.add(d)
          })
      }
    );
    this.allDiariesInClinic.emit(this.allDiaries)
    this.diarySuscriber.emit(this.suscriber)
  }

  ngOnDestroy(): void {
    this.suscriber.unsubscribe();
  }

}
