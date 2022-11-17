import {Component, OnInit} from '@angular/core';
import {UserprofileService} from "../../../shared/services/userprofile.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(public userProfile: UserprofileService) {
  }

  ngOnInit(): void {

  }

}
