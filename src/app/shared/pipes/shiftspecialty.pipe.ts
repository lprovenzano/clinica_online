import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shiftspecialty'
})
export class ShiftspecialtyPipe implements PipeTransform {

  transform(value: any[], filtro: string): any[] {
    if(!filtro){
      return value;
    }
    return value.filter(t=> (<string>t.patient.toLowerCase()).indexOf(filtro.toLowerCase())>-1 || (<string>t.specialty.toLowerCase()).indexOf(filtro.toLowerCase())>-1)
  }

}
