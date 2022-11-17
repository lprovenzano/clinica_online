import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'patientView'
})
export class PatientViewPipe implements PipeTransform {

  transform(patient: any, some:string): string {
    if(!patient)
      return ''
    const patientObj = JSON.parse(patient)
    return patientObj.firstName + ' ' + patientObj.lastName;
  }

}
