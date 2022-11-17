import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shiftspecialtyspecialist'
})
export class ShiftspecialtyspecialistPipe implements PipeTransform {

  transform(value: Set<any>, filtro: string): Set<any> {
    if(!filtro){
      return value;
    }
    return new Set<any>(Array.from(value.values()).filter(t=> (<string>t.specialist.toLowerCase()).indexOf(filtro.toLowerCase())>-1 || (<string>t.specialty.toLowerCase()).indexOf(filtro.toLowerCase())>-1))
  }

}
