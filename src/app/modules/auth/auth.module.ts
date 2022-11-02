import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from "../../components/page/auth/login/login.component";
import {SignupComponent} from "../../components/page/auth/signup/signup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "../../components/utils/spinner/spinner.component";
import {VerifyEmailComponent} from "../../components/page/auth/verify-email/verify-email.component";
import {NotApprovedComponent} from "../../components/page/auth/not-approved/not-approved.component";


@NgModule({
  declarations: [LoginComponent, SignupComponent, SpinnerComponent, VerifyEmailComponent, NotApprovedComponent],
  exports: [
    LoginComponent,
    SignupComponent,
    SpinnerComponent,
    VerifyEmailComponent,
    NotApprovedComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
