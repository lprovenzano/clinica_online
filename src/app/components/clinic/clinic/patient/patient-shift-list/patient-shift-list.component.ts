import {Component, Input, OnInit} from '@angular/core';
import {DiaryService} from "../../../../../shared/services/diary.service";
import {Shift} from "../../../../../shared/class/shift";
import {UserprofileService} from "../../../../../shared/services/userprofile.service";
import Swal from "sweetalert2";
import {ShiftStatus} from "../../../../../shared/enums/shift-status";
import {Diary} from "../../../../../shared/class/diary";
import {DiaryStatus} from "../../../../../shared/enums/diary-status";


@Component({
  selector: 'app-patient-shift-list',
  templateUrl: './patient-shift-list.component.html',
  styleUrls: ['./patient-shift-list.component.scss']
})
export class PatientShiftListComponent implements OnInit {
  allDiaries: Set<any> = new Set<any>();
  allShifts: Set<any> = new Set<any>();
  suscriber: any;

  filter:any;

  @Input()
  allShiftsClinic: Set<any> = new Set<any>();

  @Input()
  allDiariesClinic: Set<any> = new Set<any>();

  constructor(private diaryService: DiaryService, private userProfile: UserprofileService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      const user = this.userProfile.getLoggedProfile;
      const diaries = this.diaryService.getAll().valueChanges();
      this.suscriber = diaries.subscribe(diary => {
          diary.map(d => {
            JSON.parse(d.shifts)
              .forEach((shift: Shift) => {
                try {
                  if (JSON.parse(shift.patient).idNumber === user.idNumber) {
                    shift.specialist = JSON.parse(d.doctor).firstName + ' ' + JSON.parse(d.doctor).lastName;
                    this.allShifts.add(shift);
                  }
                } catch (ex) {

                }
              });
            this.allDiaries.add(d)
          })
        }
      );
    }, 1500)
  }

  filterCriteria(filter: any) {
    return filter;
  }

  async seeReview(shift: Shift) {
    await Swal.fire('Comentarios: ', '<p><b>Comentario:</b> ' + shift.review + '<hr><p><b>Diagnóstico: </b> ' + shift.diagnostic + '</p>')
  }

  async cancel(shift: Shift) {
    Swal.fire({
      title: 'Seguro que querés cancelar el turno?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.cancellationModal(shift)
        await Swal.fire('Turno cancelado', '', 'success')
      } else if (result.isDenied) {
       await Swal.fire('No fue cancelado', '', 'info')
      }
    })
  }

  private async cancellationModal(shift: Shift) {
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

  private async update(shift: Shift, message: any, status: ShiftStatus){
    let shiftTaken = shift;
    shiftTaken.status = status;
    shiftTaken.review = message.review;
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
    }, 500)
  }
}
