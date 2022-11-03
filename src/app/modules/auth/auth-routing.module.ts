import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "../../components/page/auth/signup/signup.component";
import {LoginComponent} from "../../components/page/auth/login/login.component";
import {VerifyEmailComponent} from "../../components/page/auth/verify-email/verify-email.component";
import {NotApprovedComponent} from "../../components/page/auth/not-approved/not-approved.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup', component: SignupComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'verify-email', component: VerifyEmailComponent
      },
      {
        path: 'not-approved', component: NotApprovedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
