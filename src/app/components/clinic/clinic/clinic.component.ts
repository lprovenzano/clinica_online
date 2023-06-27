import { Subscription } from 'rxjs';
import { Observable, Subscriber } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {UserprofileService} from "../../../shared/services/userprofile.service";
import {DiaryService} from "../../../shared/services/diary.service";

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit, OnDestroy {

  shifts: Set<any> = new Set<any>();
  allShiftClinic: Set<any> = new Set<any>();
  allDiariesClinic: Set<any> = new Set<any>();
  diaries?: Observable<any[]>
  selectedDoctor: any;
  selectedShifts: any[] = [];
  diarySuscriber: any;
  suscriber?: Subscription;

  constructor(
    public authService: AuthService,
    public diaryService: DiaryService,
    public userProfile: UserprofileService) {
  }
  ngOnDestroy(): void {
    this.suscriber?.unsubscribe();
    this.diaries = new Observable();
  }

  ngOnInit(): void {
    this.suscriber = this.diaryService.get().subscribe((diary:any) => {
        diary.map((d:any) => {
            this.allDiariesClinic.add(d)
            this.allShiftClinic.add(JSON.parse(d.shifts))
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
}
