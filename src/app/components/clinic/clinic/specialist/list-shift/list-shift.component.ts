import {Component, Input, OnInit} from '@angular/core';
import {Shift} from "../../../../../shared/class/shift";
import Swal from "sweetalert2";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";
import {Diary} from "../../../../../shared/class/diary";
import moment from "moment";
import {DateService} from "../../../../../shared/services/date.service";
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
  diarySuscriber: any;

  @Input()
  myDiaries: Set<any> = new Set<any>();

  constructor(private dateService: DateService, private diaryService: DiaryService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      Array.from(this.shifts.values()).forEach(x => {
        this.myShifts = this.myShifts.concat(x)
      })
      this.diarySuscriber.unsubscribe();
    }, 1500);
  }

  filterCriteria(filter: any) {
    return filter;
  }

  async finishShift(shift: Shift) {
    const {value: formValues} = await Swal.fire({
      title: '',
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
      if (formValues[0].trim().toLowerCase().length === 0) {
        await Swal.fire('Debe tener una reseña', '', "error")
      } else if (formValues[1].trim().toLowerCase().length === 0) {
        await Swal.fire('Debe tener un dianóstico', '', "error")
      } else {
        this.update(shift, {
          review: formValues[0],
          diagnostic: formValues[1]
        }, ShiftStatus.FINISHED)
      }
    }
  }

  async rejectShift(shift: Shift) {
    const {value: formValues} = await Swal.fire({
      title: '',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Motivo de rechazo">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value
        ]
      }
    })
    if (formValues) {
      if (formValues[0].trim().toLowerCase().length === 0) {
        await Swal.fire('Debe tener un motivo', '', "error")
      } else {
        this.update(shift, {review: formValues[0], diagnostic: ''}, ShiftStatus.REJECTED);
      }
    }
  }

  async cancelShift(shift: Shift) {
    const {value: formValues} = await Swal.fire({
      title: '',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Motivo de cancelación" required>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value
        ]
      }
    })
    if (formValues) {
      if (formValues[0].trim().toLowerCase().length === 0) {
        await Swal.fire('Debe tener un motivo', '', "error")
      } else {
       this.update(shift, {review: formValues[0], diagnostic: ''}, ShiftStatus.CANCELLED);
      }

    }
  }

  async acceptShift(shift: Shift) {
    this.update(shift, {review: '', diagnostic: ''}, ShiftStatus.ACCEPTED)
  }

  private update(shift: Shift, response: any, status: ShiftStatus) {
    const date = moment(shift.date);
    const dayOfWeek = this.dateService.getDayByNumber(date.isoWeekday())
    const diaries = Array.from(this.myDiaries.values()).filter(x => x.specialty === shift.specialty && x.day === dayOfWeek)
    let shiftUpdated = shift;
    shiftUpdated.review = response.review;
    shiftUpdated.diagnostic = response.diagnostic;
    shiftUpdated.status = status
    const index = this.myShifts.indexOf(shift);
    this.myShifts[index] = shiftUpdated;
    this.diaryService.delete(new Diary(this.myShifts, JSON.parse(diaries[0].doctor), diaries[0].specialty, diaries[0].day, diaries[0].start, diaries[0].end, diaries[0].status))
      .then(r => {
        this.diaryService.create(new Diary(this.myShifts, JSON.parse(diaries[0].doctor), diaries[0].specialty, diaries[0].day, diaries[0].start, diaries[0].end, diaries[0].status))
      });

  }

  async seeReview(shift: any) {
    await Swal.fire('Reseña', shift.review)
  }
}
