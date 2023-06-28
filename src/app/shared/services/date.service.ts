import {Injectable} from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
  }

  getNextDatesInMonth(day: string, firstShift: number, lastShift: number) {
    moment.locale("es");
    let shiftsDates: Date[] = [];
    const totalShifts = (lastShift - firstShift) * 2;
    let theDay = moment()
      .startOf('month')
      .day(day)
      .set('hour', firstShift);
    if (theDay.date() > 7) theDay.add(7, 'd');
    const month = theDay.month();
    while (month === theDay.month()) {
      let shiftCounter = 0;
      while (shiftCounter < totalShifts) {
        shiftsDates.push(theDay.toDate())
        theDay.add(30, 'm').toDate()
        shiftCounter++;
      }
      theDay.add(7, 'd');
      theDay.set('hour', firstShift)
    }
    return shiftsDates;
  }

  public getDayByNumber(dayNumber: number){
    switch (dayNumber){
      case 1:
        return 'lunes'
      case 2:
        return 'martes'
      case 3:
        return 'miércoles'
      case 4:
        return 'jueves'
      case 5:
        return 'viernes'
      case 6:
        return 'sábado'
      case 7:
        return 'domingo'
      default:
        return ''
    }
  }
}

