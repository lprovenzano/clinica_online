import {Component, Input, OnInit} from '@angular/core';
import {Shift} from "../../../../../shared/class/shift";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";
import {UserprofileService} from "../../../../../shared/services/userprofile.service";
import {Diary} from "../../../../../shared/class/diary";
import {DiaryStatus} from "../../../../../shared/enums/diary-status";
import {DiaryService} from "../../../../../shared/services/diary.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-patient-shift-request-list',
  templateUrl: './patient-shift-request-list.component.html',
  styleUrls: ['./patient-shift-request-list.component.scss']
})
export class PatientShiftRequestListComponent implements OnInit {

  @Input()
  shifts: Shift[] = []

  @Input()
  allShifts: Set<any> = new Set<any>();

  @Input()
  allDiariesClinic: Set<any> = new Set<any>();

  @Input()
  diary: any;

  constructor(
    private userProfile: UserprofileService,
    private diaryService: DiaryService
  ) {
  }

  ngOnInit(): void {
  }

  takeShift(shift: Shift) {
    let shiftTaken = shift;
    shiftTaken.status = ShiftStatus.TAKEN;
    shiftTaken.patient = JSON.stringify(this.userProfile.getLoggedProfile)
    const diary = Array.from(this.allDiariesClinic.values()).filter(d => {
      try {
        return d.specialty === shift.specialty && JSON.parse(d?.shifts).find((x: any) => x.id === shift.id)
      } catch (ex) {
      }
    })
    const allShifts = JSON.parse(diary[0].shifts);
    const index = allShifts.indexOf(allShifts.find((x: any) => x.id === shift.id))
    allShifts[index] = shiftTaken;
    const diaryStatus = allShifts.some((x:any) => x.status === ShiftStatus.AVAILABLE) ? DiaryStatus.AVAILABLE : DiaryStatus.FULL;
    const newDiary = new Diary(allShifts, JSON.parse(diary[0].doctor), diary[0].specialty, diary[0].day, diary[0].start, diary[0].end, diaryStatus)
    setTimeout(async () => {
      await this.diaryService.delete(newDiary)
        .then(x => {
          this.diaryService.create(newDiary)
          console.log('UPDATED: ', newDiary)
          Swal.fire({
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6'
          }).then((result) => {
            if (result.isConfirmed) {
               window.location.reload();
            }
          })
        });
    }, 1000)
  }
}
