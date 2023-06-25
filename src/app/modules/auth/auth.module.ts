import { SharedModule } from './../shared/shared.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from "../../components/page/auth/login/login.component";
import {SignupComponent} from "../../components/page/auth/signup/signup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VerifyEmailComponent} from "../../components/page/auth/verify-email/verify-email.component";
import {NotApprovedComponent} from "../../components/page/auth/not-approved/not-approved.component";


@NgModule({
  declarations: [LoginComponent, SignupComponent, VerifyEmailComponent, NotApprovedComponent],
  exports: [
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
    NotApprovedComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {
}
