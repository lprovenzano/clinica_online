import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(this.controls);
    if (this.selectedProfile === 'patient') {
      this.addPatientControls();
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
  }

  onSubmit(form: any) {
    console.log(form.value)
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
    console.log(this.formGroup.value);
    this.sent = true;
  }

  pushIfNotExists(specialty: any) {
    if (this.specialties.indexOf(specialty) === -1) {
      this.specialties.push(specialty)
    }
  }

  isValidForm() {
    return !this.formGroup.valid || this.specialties.length === 0;
  }

  deleteSpecialty(specialty: string) {
    this.specialties = this.specialties.filter(s => s !== specialty);
  }

  private addPatientControls() {
    this.formGroup.addControl('image2', this.formBuilder.control('', [Validators.required]));
    this.formGroup.addControl('social-work', this.formBuilder.control('', [Validators.required]));
  }

  private removePatientControls() {
    this.formGroup.removeControl('image2');
    this.formGroup.removeControl('social-work');
  }
}
