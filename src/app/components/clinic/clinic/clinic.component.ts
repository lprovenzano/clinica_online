import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {UserprofileService} from "../../../shared/services/userprofile.service";
import {Diary} from "../../../shared/class/diary";

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  shifts: Set<any> = new Set<any>();
  diaries: Diary[] = []
  selectedDoctor: any;
  selectedShifts: any[] = [];

  constructor(
    public authService: AuthService,
    public userProfile: UserprofileService) {
  }

  ngOnInit(): void {
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
}
