export class Doctor {
  firstName: string;
  lastName: string;
  specialties: string[];
  idNumber: string;


  constructor(firstName: string, lastName: string, specialties: string[], idNumber: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialties = specialties;
    this.idNumber = idNumber;
  }

  getIdentifier() {
    return this.firstName + ' ' + this.lastName + ' - ' + this.specialties.join(', ');
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
