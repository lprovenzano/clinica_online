import {Component, Input, OnInit} from '@angular/core';
import {Shift} from "../../../../../shared/class/shift";
import Swal from "sweetalert2";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";
import {Diary} from "../../../../../shared/class/diary";
import moment from "moment";
import {DateService} from "../../../../../shared/services/date.service";
import {Observable} from "rxjs";
import {DiaryService} from "../../../../../shared/services/diary.service";

@Component({
  selector: 'app-list-shift',
  templateUrl: './list-shift.component.html',
  styleUrls: ['./list-shift.component.scss']
})
export class ListShiftComponent implements OnInit {

  @Input()
  shifts: Set<any> = new Set<any>();
  myShifts: Shift[] = [];
  filter: any;

  @Input()
  myDiaries: Diary[] = [];

  constructor(private dateService: DateService, private diaryService: DiaryService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      Array.from(this.shifts.values()).forEach(x => {
        this.myShifts = this.myShifts.concat(x)
      })
    }, 2000);
  }

  filterCriteria(filter: any) {
    return filter;
  }

  async finishShift(shift: Shift) {
    const {value: formValues} = await Swal.fire({
      title: 'Multiple inputs',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Reseña">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Diagnostico">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ]
      }
    })
    if (formValues) {
      setTimeout(() => this.update(shift, {review: formValues[0], diagnostic: formValues[1]}), 1000)
    }
  }

  private update(shift: Shift, response: any) {
    moment.locale("es")
    const date = moment(shift.date);
    const dayOfWeek = this.dateService.getDayByNumber(date.isoWeekday())
    this.myDiaries = this.myDiaries.filter(x => x.specialty === shift.specialty && x.day === dayOfWeek)
    let shiftUpdated = shift;
    shiftUpdated.review = response.review;
    shiftUpdated.diagnostic = response.diagnostic;
    shiftUpdated.status = ShiftStatus.FINISHED
    const index = this.myShifts.indexOf(shift);
    this.myShifts[index] = shiftUpdated;
    this.diaryService.update(new Diary(this.myShifts, JSON.parse(this.myDiaries[0].doctor), this.myDiaries[0].specialty, this.myDiaries[0].day, this.myDiaries[0].start, this.myDiaries[0].end, this.myDiaries[0].status)).then(r => console.log(r))
  }
}
