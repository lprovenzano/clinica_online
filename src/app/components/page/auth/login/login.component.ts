import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  private controls = {
    'email': [null, [Validators.required, Validators.pattern(this.emailRegex)]],
    'password': [null, [Validators.required, Validators.minLength(6)]]
  }
  formGroup: FormGroup;
  user: any;
  password: any;
  sent: boolean = false;

  quickAccess = [
    {
      photo: "assets/images/page/doctor.png",
      user: "doctor_1@email.com",
      password: 123456789
    },
    {
      photo: "assets/images/page/doctor.png",
      user: "doctor_2@email.com",
      password: 123456789
    },
    {
      photo: "assets/images/page/patient.png",
      user: "patient_1@email.com",
      password: 123456789
    },
    {
      photo: "assets/images/page/patient.png",
      user: "patient_2@email.com",
      password: 123456789
    },
    {
      photo: "assets/images/page/patient.png",
      user: "patient_3@email.com",
      password: 123456789
    },
    {
      photo: "assets/images/page/admin.png",
      user: "admin@email.com",
      password: 123456789
    }
  ]

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.formGroup = this.formBuilder.group(this.controls);
  }


  ngOnInit(): void {
  }

  login() {
    this.sent = true;
    this.authService.SignIn(this.user, this.password)
  }

  onLogin(user: any, password: any) {
    this.user = user;
    this.password = password;
  }
}
