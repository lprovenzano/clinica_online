import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {UserprofileService} from "../../../../shared/services/userprofile.service";
import {ImagestorageService} from "../../../../shared/services/imagestorage.service";
import {Userprofile} from "../../../../shared/class/userprofile";
import {Role} from "../../../../shared/enums/role";

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';
  selectedProfile: any = 'patient';
  sent = false;
  images: any = []
  profiles = [
    {
      name: "patient",
      description: "Paciente",
      image: '/assets/images/page/patient.png'
    },
    {
      name: "specialist",
      description: "Especialista",
      image: '/assets/images/page/doctor.png'
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

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userProfileService: UserprofileService,
              private imageStorage: ImagestorageService) {
    this.formGroup = this.formBuilder.group(this.controls);
  }

  ngOnInit(): void {
  }


  register() {
    this.sent = true;
    let userProfile = new Userprofile("", this.formGroup.value.firstName, this.formGroup.value.lastName, this.formGroup.value.idNumber, this.formGroup.value.age, [], Role.ADMIN, [], true)
    userProfile.socialWork = ''
    this.authService.SignUp(this.formGroup.value.email, this.formGroup.value.password);
    setTimeout(() => {
      const userUid = this.authService.loggedUser.uid;
      this.imageStorage.bulkUpload(this.images, userUid)
      userProfile.id = userUid
      this.userProfileService.create(userProfile)
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

  uploadImage($event: any) {
    Array.from($event.target.files).forEach(f => this.images.push(f));
  }

}
