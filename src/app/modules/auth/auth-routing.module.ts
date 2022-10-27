import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "../../components/page/auth/signup/signup.component";
import {LoginComponent} from "../../components/page/auth/login/login.component";

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
        path: '**', redirectTo: 'login'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
