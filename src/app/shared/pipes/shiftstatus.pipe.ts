import {Pipe, PipeTransform} from '@angular/core';
import {ShiftStatus} from "../enums/shift-status";

@Pipe({
  name: 'shiftstatus'
})
export class ShiftstatusPipe implements PipeTransform {

  transform(status: ShiftStatus): string {
    switch (status) {
      case ShiftStatus.AVAILABLE:
        return 'DISPONIBLE'
      case ShiftStatus.CANCELLED:
        return 'CANCELADO'
      case ShiftStatus.FINISHED:
        return 'FINALIZADO'
      case ShiftStatus.REJECTED:
        return 'RECHAZADO'
      case ShiftStatus.ACCEPTED:
        return 'ACEPTADO'
      case ShiftStatus.TAKEN:
        return 'SOLICITADO'
    }
  }

}
