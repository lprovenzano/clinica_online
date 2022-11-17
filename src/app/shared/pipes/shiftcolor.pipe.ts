import { Pipe, PipeTransform } from '@angular/core';
import {ShiftStatus} from "../enums/shift-status";

@Pipe({
  name: 'shiftcolor'
})
export class ShiftcolorPipe implements PipeTransform {

  transform(status: ShiftStatus): string {
    switch (status) {
      case ShiftStatus.AVAILABLE:
        return 'text-bg-success'
      case ShiftStatus.CANCELLED:
        return 'text-bg-danger'
      case ShiftStatus.FINISHED:
        return 'text-bg-dark'
      case ShiftStatus.REJECTED:
        return 'text-bg-danger'
      case ShiftStatus.ACCEPTED:
        return 'text-bg-success'
      case ShiftStatus.TAKEN:
        return 'text-bg-info'
    }
  }

}
