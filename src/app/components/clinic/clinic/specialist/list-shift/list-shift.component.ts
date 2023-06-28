import { map, take } from 'rxjs';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, Pipe, OnDestroy } from '@angular/core';
import {Shift} from "../../../../../shared/class/shift";
import Swal from "sweetalert2";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";
import {Diary} from "../../../../../shared/class/diary";
import {DateService} from "../../../../../shared/services/date.service";
import {HistoryService} from "../../../../../shared/services/history.service";
import {DiaryService} from "../../../../../shared/services/diary.service";
import {History} from "../../../../../shared/class/history";

@Component({
  selector: 'app-list-shift',
  templateUrl: './list-shift.component.html',
  styleUrls: ['./list-shift.component.scss']
})
export class ListShiftComponent implements OnInit, OnDestroy {
  myShifts: any[] = [];
  filter: any;
  loading: boolean = false;
  suscriber?: Subscription;

  @Input()
  myDiaries?: Observable<any[]>

  constructor(private dateService: DateService,
    private diaryService: DiaryService,
    private historyClinic: HistoryService) {
  }
  ngOnDestroy(): void {
   this.suscriber?.unsubscribe()
  }

  ngOnInit(): void {
    this.loading = true;
    const today = new Date();
    setTimeout(()=> {
      this.myDiaries?.subscribe(d =>
        d.map(d => {
        this.myShifts = []
        //const shift = JSON.parse(d.shifts).filter((s:any) => new Date(s.date)> today) as []
        const shift = JSON.parse(d.shifts)
        shift.forEach((x:any) => {
          x.diaryId = d.id;
          this.myShifts.push(x)
        })
        this.loading = false;
      }));
    }, 250)
  }

  filterCriteria(filter: any) {
    return filter;
  }

  async finishShift(shift: any) {
    console.log('SHIFT FINISHED: ')
    console.log(shift)
    const {value: formValues} = await Swal.fire({
      title: '',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Reseña">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Diagnostico">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Peso">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Altura">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Temperatura">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Presión">' +
        '<hr>' +
        '<h5>Información adicional</h5>' +
        '<input id="swal-input7" class="swal2-input" placeholder="Categoría"> <input id="swal-input8" class="swal2-input" placeholder="Info adicional">' +
        '<input id="swal-input9" class="swal2-input" placeholder="Categoría 2"> <input id="swal-input10" class="swal2-input" placeholder="Info adicional 2">' +
        '<input id="swal-input11" class="swal2-input" placeholder="Categoría 3"> <input id="swal-input12" class="swal2-input" placeholder="Info adicional 3">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
          (document.getElementById('swal-input3') as HTMLInputElement).value,
          (document.getElementById('swal-input4') as HTMLInputElement).value,
          (document.getElementById('swal-input5') as HTMLInputElement).value,
          (document.getElementById('swal-input6') as HTMLInputElement).value,
          (document.getElementById('swal-input7') as HTMLInputElement).value,
          (document.getElementById('swal-input8') as HTMLInputElement).value,
          (document.getElementById('swal-input9') as HTMLInputElement).value,
          (document.getElementById('swal-input10') as HTMLInputElement).value,
          (document.getElementById('swal-input11') as HTMLInputElement).value,
          (document.getElementById('swal-input12') as HTMLInputElement).value
        ]
      }
    })
    if (formValues) {
      if (formValues.slice(0, 5).filter(x => x.trim().toLowerCase().length === 0).length > 0) {
        await Swal.fire('Hay que completar los campos obligatorios.', '', "error")
      } else {

    const diary = this.myDiaries?.pipe(map((d:any) => d.find((x:any) => x.id == shift.diaryId)));
    this.suscriber = diary?.pipe(take(1)).subscribe((d:any) => {
      let newDiary = new Diary(this.myShifts, JSON.parse(d.doctor), d.specialty, d.day, d.start, d.end, d.status);
      newDiary.id = shift.diaryId;
      newDiary.shifts = ''
      let map = new Map<string, string>();
      map.set(formValues[6], formValues[7])
      map.set(formValues[8], formValues[9])
      map.set(formValues[10], formValues[11])
      let history = new History('', shift.patient, <any>formValues[3], <any>formValues[2], <any>formValues[5], <any>formValues[4], '', shift.date);
      console.log(JSON.stringify(Object.fromEntries(map)))
      history.additionalInformation = JSON.stringify(Object.fromEntries(map));
      let answers = {
        diary: JSON.stringify(newDiary),
        review: formValues[0],
        diagnostic: formValues[1],
        history: JSON.stringify(history)
      } as any;
      this.historyClinic.save('history', answers)
      this.update(shift, answers, ShiftStatus.FINISHED)
    });
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
    let shiftUpdated = shift as any;
    shiftUpdated.review = response.review;
    shiftUpdated.diagnostic = response.diagnostic;
    shiftUpdated.status = status;
    this.myShifts[this.myShifts.findIndex(x => x.id === shiftUpdated.id)] = shiftUpdated;
    const diary = this.myDiaries?.pipe(map((d:any) => d.find((x:any) => x.id == shiftUpdated.diaryId)));
    this.suscriber = diary?.pipe(take(1)).subscribe((d:any) => {
      let newDiary = new Diary(this.myShifts, JSON.parse(d.doctor), d.specialty, d.day, d.start, d.end, d.status);
      newDiary.id = shiftUpdated.diaryId;
      setTimeout(async () => {
        await this.diaryService.update(newDiary)
          .then(x => {
            Swal.fire({
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6'
            }).then((result) => {
              // if (result.isConfirmed) {
              //    window.location.reload();
              // }
            })
          });
      }, 1000)
    })
  }

  async seeReview(shift: any) {
    await Swal.fire('Comentarios', '<p><b>Comentario:</b> ' + shift.review + '<hr><p><b>Diagnóstico: </b> ' + shift.diagnostic + '</p>')
  }
}
