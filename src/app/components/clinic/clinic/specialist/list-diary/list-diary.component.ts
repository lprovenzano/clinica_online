import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DiaryService} from "../../../../../shared/services/diary.service";
import {map, Observable, Subscription} from "rxjs";
import {UserprofileService} from "../../../../../shared/services/userprofile.service";

@Component({
  selector: 'app-list-diary',
  templateUrl: './list-diary.component.html',
  styleUrls: ['./list-diary.component.scss']
})
export class ListDiaryComponent implements OnInit {

  diariesObservable?: Observable<any[]>;
  allShifts: Set<any> = new Set<any>();

  @Output()
  allDiariesInClinic = new EventEmitter<any>();

  constructor(
    private diaryService: DiaryService,
    private userProfile: UserprofileService
  ) {
  }

  ngOnInit(): void {
    const user = this.userProfile.getLoggedProfile;
    this.diariesObservable = this.diaryService.getAll().valueChanges().pipe(
      map((diary: any[]) => diary.filter(d => JSON.parse(d.doctor).idNumber === user.idNumber))
    )
    this.allDiariesInClinic.emit(this.diariesObservable)
  }
}
