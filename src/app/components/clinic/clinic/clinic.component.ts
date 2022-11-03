import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {UserprofileService} from "../../../shared/services/userprofile.service";

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public userProfile: UserprofileService ) {
  }

  ngOnInit(): void {
  }

}
