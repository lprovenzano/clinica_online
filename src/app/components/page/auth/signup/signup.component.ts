import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Role} from "../../../../shared/enums/role";
import {Userprofile} from "../../../../shared/class/userprofile";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  selectedProfile: any = 'patient';
  sent = false;
  profiles = [
    {
      name: "patient",
      description: "Paciente"
    },
    {
      name: "specialist",
      description: "Especialista"
    }
  ];
  private emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  private idNumberRegex: RegExp = /[^a-z ]\ *([.0-9])*\d/g
  private controls = {
    'email': [null, [Validators.required, Validators.pattern(this.emailRegex)]],
    'firstName': [null, [Validators.required, Validators.minLength(3)]],
    'lastName': [null, [Validators.required, Validators.minLength(3)]],
    'age': [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    'idNumber': [null, [Validators.required, Validators.pattern(this.idNumberRegex), Validators.minLength(8), Validators.maxLength(8)]],
    'password': [null, [Validators.required, Validators.minLength(6)]],
    'image1': [null, Validators.required]
  }
  specialties: string[] = [];
  selectedSpecialty: any;

  quickAccess = [
    {
      photo: "assets/images/page/doctor.png",
      user: "doctor_1@email.com",
      password: 987654321
    },
    {
      photo: "assets/images/page/patient.png",
      user: "patient_1@email.com",
      password: 123456789
    }
  ]

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.formGroup = this.formBuilder.group(this.controls);
    if (this.selectedProfile === 'patient') {
      this.addPatientControls();
    }
  }

  ngOnInit(): void {
  }


  onChangeProfile(profile: any) {
    this.selectedProfile = profile.name;
    this.selectedProfile === 'patient' ? this.addPatientControls() : this.removePatientControls();

  }

  addSpecialty() {
    if (this.selectedSpecialty) {
      this.pushIfNotExists(this.selectedSpecialty)
    }
  }

  register() {
    this.sent = true;
    let userProfile = new Userprofile("", this.formGroup.value.firstName, this.formGroup.value.lastName, this.formGroup.value.idNumber, this.formGroup.value.age, [this.formGroup.value.image1], this.getRole(), this.specialties, this.selectedProfile !== 'specialist')
    if (this.selectedProfile === 'patient') {
      userProfile.profilePhotos.push(this.formGroup.value?.image2)
      userProfile.socialWork = this.formGroup.value.socialWork;
    }
    setTimeout(() => {
      this.authService.SignUp(this.formGroup.value.email, this.formGroup.value.password, userProfile);
    }, 2000);
  }

  pushIfNotExists(specialty: any) {
    if (this.specialties.indexOf(specialty) === -1) {
      this.specialties.push(specialty)
    }
  }

  isValidForm() {
    return !this.formGroup.valid;
  }

  deleteSpecialty(specialty: string) {
    this.specialties = this.specialties.filter(s => s !== specialty);
  }

  private addPatientControls() {
    this.formGroup.addControl('image2', this.formBuilder.control('', [Validators.required]));
    this.formGroup.addControl('socialWork', this.formBuilder.control('', [Validators.required]));
  }

  private removePatientControls() {
    this.formGroup.removeControl('image2');
    this.formGroup.removeControl('socialWork');
  }

  private getRole(): Role {
    switch (this.selectedProfile) {
      case 'specialist': {
        return Role.SPECIALIST;
      }
      case 'patient': {
        return Role.PATIENT;
      }
      default: {
        return Role.ADMIN;
      }
    }
  }
}
