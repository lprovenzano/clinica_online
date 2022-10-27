import {Component, OnInit} from '@angular/core';
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
  specialties = [{value: ""}]
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

  constructor(private formBuilder: FormBuilder) {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'name': [null, Validators.required],
      'password': [null, Validators.required],
      'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      'validate': ''
    });
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
  }

  removeSpecialty() {
    this.specialties.pop()
  }

  addSpecialty(){
    this.specialties.push({value: ""});
  }
}
