import {Shift} from "./shift";
import {Doctor} from "./doctor";
import {DiaryStatus} from "../enums/diary-status";

export class Diary {
  shifts: string;
  doctor: string;
  specialty: string;
  static duration: number = 30;
  day: string;
  start: number;
  end: number;
  status: DiaryStatus


  constructor(shifts: Shift[], doctor: Doctor, specialty: string, day: string, start: number, end: number, status: DiaryStatus) {
    this.shifts = JSON.stringify(shifts);
    this.doctor = JSON.stringify(doctor);
    this.specialty = specialty;
    this.day = day;
    this.start = start;
    this.end = end;
    this.status = status;
  }
}
