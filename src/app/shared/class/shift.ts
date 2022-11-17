import {ShiftStatus} from "../enums/shift-status";
import {Survey} from "./survey";

export class Shift {
  id: number;
  status: ShiftStatus;
  patient: string;
  survey: Survey[];
  date: Date;
  specialty: string;
  diagnostic: string;
  review: string;
  specialist: string;

  constructor(id: number, status: ShiftStatus, patient: string, survey: Survey[], date: Date, specialty: string) {
    this.id = id;
    this.status = status;
    this.patient = patient;
    this.survey = survey;
    this.date = date;
    this.specialty = specialty;
    this.diagnostic = ''
    this.review = ''
    this.specialist = ''
  }

}
