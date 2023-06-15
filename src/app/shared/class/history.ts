export class History {
  doctor: string;
  patient: string;
  height: number;
  weight: number;
  pressure: number;
  temperature: number;
  additionalInformation:{ [key: string]: string } = {};


  constructor(doctor: string, patient: string, height: number, weight: number, pressure: number, temperature: number, additionalInformation: {}) {
    this.doctor = doctor;
    this.patient = patient;
    this.height = height;
    this.weight = weight;
    this.pressure = pressure;
    this.temperature = temperature;
    this.additionalInformation = additionalInformation;
  }
}
