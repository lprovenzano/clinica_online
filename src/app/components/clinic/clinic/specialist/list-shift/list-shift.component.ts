import { Observable } from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';
import {Shift} from "../../../../../shared/class/shift";
import Swal from "sweetalert2";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";
import {Diary} from "../../../../../shared/class/diary";
import moment from "moment";
import {DateService} from "../../../../../shared/services/date.service";
import {DiaryService} from "../../../../../shared/services/diary.service";
import {History} from "../../../../../shared/class/history";

@Component({
  selector: 'app-list-shift',
  templateUrl: './list-shift.component.html',
  styleUrls: ['./list-shift.component.scss']
})
export class ListShiftComponent implements OnInit {
  myShifts: Shift[] = [];
  filter: any;
  loading: boolean = false;

  @Input()
  myDiaries?: Observable<any[]>

  constructor(private dateService: DateService, private diaryService: DiaryService) {
  }

  ngOnInit(): void {
    this.loading = true;
    const today = new Date();
    setTimeout(()=> {
      this.myDiaries?.subscribe(d => d.map(d => {
        this.myShifts = JSON.parse(d.shifts).filter((s:any) => new Date(s.date)> today);
        this.loading = false;
      }));
    }, 1000)
  }

  filterCriteria(filter: any) {
    return filter;
  }

  async finishShift(shift: Shift) {
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
        let answers = {
          review: formValues[0],
          diagnostic: formValues[1],
          history: new History('', shift.patient, <any>formValues[3], <any>formValues[2], <any>formValues[5], <any>formValues[4], {})
        };
        //const optional1 = formValues[6];
        //console.log(optional1)
        answers.history.additionalInformation['optional'] = formValues[7]
        answers.history.additionalInformation[formValues[8]] = formValues[9]
        answers.history.additionalInformation[formValues[10]] = formValues[11];
        this.update(shift, answers, ShiftStatus.FINISHED)
        console.log('RESPONSE:', answers)
        console.log('SHIFT:', shift)
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
    let shiftUpdated = shift;
    shiftUpdated.review = response.review;
    shiftUpdated.diagnostic = response.diagnostic;
    shiftUpdated.status = status;
    this.myShifts[this.myShifts.findIndex(x => x.id === shiftUpdated.id)] = shiftUpdated;
    this.myDiaries?.forEach(d => {
      // TODO: esto está pésimo, ver workaround
      const diary = new Diary(this.myShifts, JSON.parse(d[0].doctor), d[0].specialty, d[0].day, d[0].start, d[0].end, d[0].status);
      this.diaryService.update(diary).then(x => console.log(x))
    });
  }

  async seeReview(shift: any) {
    await Swal.fire('Comentarios', '<p><b>Comentario:</b> ' + shift.review + '<hr><p><b>Diagnóstico: </b> ' + shift.diagnostic + '</p>')
  }
}
