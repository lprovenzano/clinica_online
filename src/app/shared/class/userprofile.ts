import {Role} from "../enums/role";

export class Userprofile {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  age: number;
  profilePhotos: string[];
  role: Role;
  specialties: string[];
  socialWork: any;
  approved: boolean;

  constructor(id: string, firstName: string, lastName: string, idNumber: string, age: number, profilePhotos: any[], role: Role, specialties: string[], approved: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.age = age;
    this.profilePhotos = profilePhotos;
    this.role = role;
    this.specialties = specialties;
    this.approved = approved;
  }
}
